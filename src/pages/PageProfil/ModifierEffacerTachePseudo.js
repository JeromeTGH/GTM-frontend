import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { enregistrerInfosUtilisateur } from '../../redux/user.slice';

const ModifierEffacerTachePseudo = () => {

    const [msgErreurOnTaskChange, setMsgErreurOnTaskChange] = useState([]);
    const [userTachesPossiblesDeFaire, setUserTachesPossiblesDeFaire] = useState([]);

    const [tachesEditables, setTachesEditables] = useState([]);
    const [nouvellesTaches, setNouvellesTaches] = useState([]);

    const utilisateur = useSelector((donnees) => donnees.user[0]);
    const dispatch = useDispatch();

    const supprimerTache = (idx) => {

        const libelleTachePossibleAsupprimer = userTachesPossiblesDeFaire[idx][0];
        const descriptionTachePossibleAsupprimer = userTachesPossiblesDeFaire[idx][1];

        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?") === true) {

            setMsgErreurOnTaskChange(new Array(userTachesPossiblesDeFaire.length).fill(''));

            axios({
                method: "patch",
                url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/removeTask/${utilisateur._id}`,
                withCredentials: true,
                data: {
                    libelle: libelleTachePossibleAsupprimer,
                    description: descriptionTachePossibleAsupprimer
                }
            })
            .then((res) => {
                if(res.data.erreur) {
                    // Afficher éventuellement une erreur, dans un champ approprié
                    console.log(res.data.erreur);
                } else {
                    // Met à jour le tableau des éléments éditables
                    const newTachesEditables = [...tachesEditables];
                    newTachesEditables.splice(idx, 1);
                    setTachesEditables(tachesEditables => [...newTachesEditables]);
                    // Met à jour le contenu des taches éditables
                    const newNouvellesTaches = [...nouvellesTaches];
                    newNouvellesTaches.splice(idx, 1);
                    setNouvellesTaches(nouvellesTaches => [...newNouvellesTaches]);
                    // Met à jour le store utilisateur
                    dispatch(enregistrerInfosUtilisateur(res.data));
                }
            })
            .catch((erreur) => {
                // Afficher éventuellement une erreur, dans un champ approprié
                const newMsgErreurOnTaskChange = new Array(userTachesPossiblesDeFaire.length).fill('');
                newMsgErreurOnTaskChange[idx] = erreur.message;
                setMsgErreurOnTaskChange(newMsgErreurOnTaskChange);
                console.log("erreur", erreur);
            })
        }
    }

    const editerTache = (idx, etat) => {

        // Initialisation des textes
        const newNouvellesTaches = [...nouvellesTaches];
        newNouvellesTaches[idx] = userTachesPossiblesDeFaire[idx];
        setNouvellesTaches(nouvellesTaches => [...newNouvellesTaches]);

        // Switch d'aperçu
        const newTachesEditables = tachesEditables;
        newTachesEditables[idx] = etat;     
        //setTachesEditables(newTachesEditables);   // ne fonctionne pas, avec ce tableau
        setTachesEditables(tachesEditables => [...newTachesEditables]);
    }

    const setNouvelleTache = (idxTache, champTache, nouvelleValeur) => {
        const newNouvellesTaches = [...nouvellesTaches];
        if(champTache === 0)
            newNouvellesTaches[idxTache] = [nouvelleValeur, newNouvellesTaches[idxTache][1]];
        else if (champTache ===1)
            newNouvellesTaches[idxTache] = [newNouvellesTaches[idxTache][0], nouvelleValeur];
        setNouvellesTaches(nouvellesTaches => [...newNouvellesTaches]);
    }

    const mettreAjourTache = idx => e => {
        e.preventDefault();
        
        setMsgErreurOnTaskChange(new Array(userTachesPossiblesDeFaire.length).fill(''));

        axios({
            method: "patch",
            url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/updateTask/${utilisateur._id}`,
            withCredentials: true,
            data: {
                old_libelle: userTachesPossiblesDeFaire[idx][0],
                old_description:  userTachesPossiblesDeFaire[idx][1],
                new_libelle: nouvellesTaches[idx][0],
                new_description: nouvellesTaches[idx][1]
            }
        })
        .then((res) => {
            if(res.data.erreur) {
                // Afficher éventuellement une erreur, dans un champ approprié
                console.log(res.data.erreur);
            } else {
                const newTachesEditables = [...tachesEditables];
                newTachesEditables[idx] = false;
                setTachesEditables(tachesEditables => [...newTachesEditables]);
                dispatch(enregistrerInfosUtilisateur(res.data));
            }
        })
        .catch((erreur) => {
            // Afficher éventuellement une erreur, dans un champ approprié
            const newMsgErreurOnTaskChange = new Array(userTachesPossiblesDeFaire.length).fill('');
            newMsgErreurOnTaskChange[idx] = erreur.message;
            setMsgErreurOnTaskChange(newMsgErreurOnTaskChange);
            console.log("erreur", erreur);
        })
    }

    useEffect(() => {
        setUserTachesPossiblesDeFaire(utilisateur.tachespossibles);
        setMsgErreurOnTaskChange(new Array(utilisateur.tachespossibles.length).fill(''))
    }, [utilisateur])

    useEffect(() => {
        if(tachesEditables.length === 0)
            setTachesEditables(new Array(utilisateur.tachespossibles.length).fill(false))
        if(tachesEditables.length !== utilisateur.tachespossibles.length) {
            for(let i=0 ; i < utilisateur.tachespossibles.length ; i++) {
                if(tachesEditables[i] === undefined)
                    tachesEditables.push(false)
            }
        }
    }, [utilisateur, tachesEditables])

    useEffect(() => {
        if(nouvellesTaches.length === 0)
            setNouvellesTaches(utilisateur.tachespossibles);
        if(nouvellesTaches.length !== utilisateur.tachespossibles.length) {
            for(let i=0 ; i < utilisateur.tachespossibles.length ; i++) {
                if(nouvellesTaches[i] === undefined)
                nouvellesTaches.push(false)
            }
        }
    }, [utilisateur, nouvellesTaches])

    return (
        <>
            {userTachesPossiblesDeFaire.length > 0 && userTachesPossiblesDeFaire.map((tache, idx) => {
                return <li key={'tachePossible-' + idx} className="main-container-profil-right-tachesAfaire">
                    <p>{tachesEditables}</p>
                    {tachesEditables[idx] === false && 
                        <>
                            <p className="main-container-profil-right-tachesAfaire-title">{tache[0]}</p>
                            <p className="main-container-profil-right-tachesAfaire-description">{tache[1]}</p>
                            <div className="main-container-profil-right-tachesAfaire-btns-1">
                                <button type="button" onClick={() => supprimerTache(idx)}>Supprimer</button>
                                <button type="button" onClick={() => editerTache(idx, true)}>Éditer</button>
                            </div>
                            <div className="msgErreur alignCenter mt1rem4">{msgErreurOnTaskChange[idx]}</div>
                        </>
                    }
                    {tachesEditables[idx] === true && 
                        <>
                            <form onSubmit={mettreAjourTache(idx)}>
                                <input type="text" className="main-container-profil-right-input" value={nouvellesTaches[idx][0]} onChange={(e) => setNouvelleTache(idx, 0, e.target.value)} />
                                <input type="text" className="main-container-profil-right-input" value={nouvellesTaches[idx][1]} onChange={(e) => setNouvelleTache(idx, 1, e.target.value)} />
                                <div className="main-container-profil-right-tachesAfaire-btns-2">
                                    <button type="button" onClick={() => editerTache(idx, false)}>Annuler édition</button>
                                    <span>&nbsp;&nbsp;</span>
                                    <button type="submit">Enregistrer changements</button>
                                </div>
                                <div className="msgErreur alignCenter mt1rem4">{msgErreurOnTaskChange[idx]}</div>
                            </form>
                        </>
                    }
                </li>
            })}
            {userTachesPossiblesDeFaire.length === 0 && (
                <li className="main-container-profil-right-tachesAfaire">
                    <p><br />==&gt; AUCUNE TÂCHE ENREGISTRÉE, POUR L'INSTANT<br /><br /></p>
                </li>
            )}
        </>
    );
};

export default ModifierEffacerTachePseudo;