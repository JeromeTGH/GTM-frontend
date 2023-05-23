import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateParser } from '../utils';
import axios from 'axios';
import { enregistrerInfosUtilisateur } from '../redux/user.slice';

const PageProfil = () => {

    const valeur_initiale_chargement = '(en cours de chargement...)';
    const [userPseudo, setUserPseudo] = useState(valeur_initiale_chargement);
    const [userCreatedAt, setUserCreatedAt] = useState(valeur_initiale_chargement);
    const [userEmail, setUserEmail] = useState(valeur_initiale_chargement);
    const [userEstActif, setUserEstActif] = useState(valeur_initiale_chargement);
    const [userTachesPossiblesDeFaire, setUserTachesPossiblesDeFaire] = useState([]);

    const [pseudoEditable, setPseudoEditable] = useState(false);        // Par défaut, au lancement de cette page, le pseudo n'est pas "éditable"
    const [nouveauPseudo, setNouveauPseudo] = useState('');             // ou plus exactement, il faut cliquer dessus ou sur le btn, pour le modifier

    const [msgErreurModificationPseudo, setMsgErreurModificationPseudo] = useState('');
    const [msgErreurModificationEnvoiEmail, setMsgErreurModificationEnvoiEmail] = useState('');
    const [msgErreurFrmAddTask, setMsgErreurFrmAddTask] = useState('');
    const [msgErreurOnTaskChange, setMsgErreurOnTaskChange] = useState([]);

    const [tachesEditables, setTachesEditables] = useState([]);
    const [nouvellesTaches, setNouvellesTaches] = useState([]);

    const utilisateur = useSelector((donnees) => donnees.user[0]);
    const dispatch = useDispatch();

    const modifieEnvoiDeEmailsAuto = () => {
        setMsgErreurModificationEnvoiEmail('');

        if(userEstActif !== valeur_initiale_chargement) {           // On ne fait rien, si la valeur "estActif" n'est pas encore chargée

            // Appel axios (si 'estActif' vaut TRUE, alors on lui demande de passer à FALSE ; et vice-versa)
            axios.put(`${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/updateOne/${utilisateur._id}`, {estActif: !userEstActif}, { withCredentials: true })
            .then ((res) => {
                dispatch(enregistrerInfosUtilisateur(res.data))
                setUserEstActif(!userEstActif)
            })
            .catch((err) => {
                console.log("err", err);
                setMsgErreurModificationEnvoiEmail(err.message);
            })
        }
    }

    const enregistreNouveauPseudo = (e) => {
        e.preventDefault();

        // Appel axios (enregistrement nouveau pseudo)
        axios.put(`${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/updateOne/${utilisateur._id}`, {pseudo: nouveauPseudo}, { withCredentials: true })
        .then ((res) => {
            if(!res.data.errors) {
                dispatch(enregistrerInfosUtilisateur(res.data));
                setPseudoEditable(false);
            } else {
                console.log("res.data.errors", res.data.errors);
                setMsgErreurModificationPseudo(res.data.errors.pseudo.message);
            }
        })
        .catch((err) => {
            console.log("err", err)
            setMsgErreurModificationPseudo(err.message);
        })
    }

    const rendPseudoEditable = () => {
        setMsgErreurModificationPseudo('');
        setNouveauPseudo(userPseudo);
        setPseudoEditable(true);
    }

    const [titreTacheAajouter, setTitreTacheAajouter] = useState('');
    const [descriptionTacheAajouter, setDescriptionTacheAajouter] = useState('');

    const ajouteNouvelleTache = (e) => {
        e.preventDefault();

        setMsgErreurFrmAddTask('');

        axios({
            method: "patch",
            url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/addTask/${utilisateur._id}`,
            withCredentials: true,
            data: {
                libelle: titreTacheAajouter,
                description: descriptionTacheAajouter
            }
        })
        .then((res) => {
            if(res.data.erreur) {
                setMsgErreurFrmAddTask(res.data.erreur);
            } else {
                dispatch(enregistrerInfosUtilisateur(res.data));
                setTitreTacheAajouter('');
                setDescriptionTacheAajouter('');
            }
        })
        .catch((erreur) => {
            setMsgErreurFrmAddTask(erreur.message);
            console.log(erreur)
        })
    }

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
        setUserPseudo(utilisateur.pseudo);
        setUserCreatedAt(dateParser(utilisateur.createdAt));
        setUserEmail(utilisateur.email);
        setUserEstActif(utilisateur.estActif);
        setUserTachesPossiblesDeFaire(utilisateur.tachespossibles);
        setMsgErreurOnTaskChange(new Array(utilisateur.tachespossibles.length).fill(''))

        setTachesEditables(new Array(utilisateur.tachespossibles.length).fill(false))
        setNouvellesTaches(utilisateur.tachespossibles);    
    }, [utilisateur])

    return (
        <div className="main-container">
            <div className="main-container-profil">
                <div className="main-container-profil-left">
                    <p className="main-container-profil-left-title">Profil de {userPseudo}</p>
                    <p className="main-container-profil-left-creationdate">Profil créé le {userCreatedAt}</p>
                    <p className="main-container-profil-left-label">→ Pseudo (cliquer dessus, pour modifier): </p>
                    {pseudoEditable === false && (
                        <>
                            <p className="main-container-profil-left-texte" onClick={() => rendPseudoEditable()}>{userPseudo}</p>
                            <p className="main-container-profil-left-btn">
                                <button onClick={() => rendPseudoEditable()}>Modifier pseudo</button>
                            </p>
                        </>
                    )}
                    {pseudoEditable === true && (
                        <>
                            <form onSubmit={enregistreNouveauPseudo}>
                                <input type="text" className="main-container-profil-left-input" value={nouveauPseudo} onChange={(e) => setNouveauPseudo(e.target.value)} />
                                <div className="msgErreur alignCenter">{msgErreurModificationPseudo}</div>
                                <p className="main-container-profil-left-btn">
                                    <button type="button" onClick={() => setPseudoEditable(false)}>Annuler édition pseudo</button>
                                    <span>&nbsp;&nbsp;</span>
                                    <button type="submit">Enregistrer modifications pseudo</button>
                                </p>
                            </form>
                        </>
                    )}
                    <p className="main-container-profil-left-label">→ Email de correspondance (non modifiable): </p>
                    <p className="main-container-profil-left-texte">{userEmail}</p>
                    <p className="main-container-profil-left-label">→ Envoi d'emails automatiques ? (chaque 1er du mois)</p>
                    <p className="main-container-profil-left-texte">{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'oui' : 'non')}</p>
                    <p className="main-container-profil-left-btn"><button onClick={() => modifieEnvoiDeEmailsAuto()}>{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'Désactiver l\'envoi d\'emails automatiques' : 'Activer l\'envoi d\'emails automatiques')}</button></p>
                    <div className="msgErreur alignCenter mt1rem4">{msgErreurModificationEnvoiEmail}</div>
                </div>
                <div className="main-container-profil-right">
                    <p className="main-container-profil-right-title">Tâches à faire chaque mois</p>
                    <ul>
                        {userTachesPossiblesDeFaire.length > 0 && userTachesPossiblesDeFaire.map((tache, idx) => {
                            return <li key={'tachePossible-' + idx} className="main-container-profil-right-tachesAfaire">
                                <p>{tachesEditables}</p>
                                {tachesEditables[idx] === false && 
                                    <>
                                        <p className="main-container-profil-right-tachesAfaire-title">{tache[0]}</p>
                                        <p className="main-container-profil-right-tachesAfaire-description">{tache[1]}</p>
                                        <div className="main-container-profil-right-tachesAfaire-btns">
                                            <button type="button" onClick={() => editerTache(idx, true)}>Éditer</button>
                                            <span>&nbsp;&nbsp;</span>
                                            <button type="button" onClick={() => supprimerTache(idx)}>Supprimer</button>
                                            <div className="msgErreur alignCenter mt1rem4">{msgErreurOnTaskChange[idx]}</div>
                                        </div>
                                    </>
                                }
                                {tachesEditables[idx] === true && 
                                    <>
                                        <form onSubmit={mettreAjourTache(idx)}>
                                            <input type="text" className="main-container-profil-right-input" value={nouvellesTaches[idx][0]} onChange={(e) => setNouvelleTache(idx, 0, e.target.value)} />
                                            <input type="text" className="main-container-profil-right-input" value={nouvellesTaches[idx][1]} onChange={(e) => setNouvelleTache(idx, 1, e.target.value)} />
                                            <div className="main-container-profil-right-tachesAfaire-btns">
                                                <button type="button" onClick={() => editerTache(idx, false)}>Annuler édition</button>
                                                <span>&nbsp;&nbsp;</span>
                                                <button type="submit">Enregistrer changements</button>
                                                <div className="msgErreur alignCenter mt1rem4">{msgErreurOnTaskChange[idx]}</div>
                                            </div>
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

                        <li className="main-container-profil-right-tachesAfaire">
                            <form action="" onSubmit={ajouteNouvelleTache} id="frmAddTask">
                                <p className="main-container-profil-right-tachesAfaire-title">Ajouter une nouvelle tâche</p>
                                <p className="main-container-profil-right-tachesAfaire-description">
                                    <label htmlFor="titreTache">Titre nouvelle tâche : </label><br />
                                    <input type="text" name="titreTache" id="titreTache" value={titreTacheAajouter} onChange={(e) => setTitreTacheAajouter(e.target.value)} /><br />
                                    <br />
                                    <label htmlFor="descriptionTache">Description nouvelle tâche : </label><br />
                                    <input type="text" name="descriptionTache" id="descriptionTache" value={descriptionTacheAajouter} onChange={(e) => setDescriptionTacheAajouter(e.target.value)} /><br />
                                    <br />
                                </p>
                                <p className="main-container-profil-right-tachesAfaire-btns">
                                    <input type="submit" value="Ajouter" className="btn" id="btnAjouterTache" />
                                </p>
                                <div className="msgErreur alignCenter mt1rem4">{msgErreurFrmAddTask}</div>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageProfil;