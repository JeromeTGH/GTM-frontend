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

    const [pseudoEditable, setPseudoEditable] = useState(false);        // Par défaut, au lancement de cette page, le pseudo n'est pas "éditable"
    const [nouveauPseudo, setNouveauPseudo] = useState('');             // ou plus exactement, il faut cliquer dessus ou sur le btn, pour le modifier

    const utilisateur = useSelector((donnees) => donnees.user[0]);
    const dispatch = useDispatch();

    const modifieEnvoiDeEmailsAuto = () => {
        if(userEstActif !== valeur_initiale_chargement) {           // On ne fait rien, si la valeur "estActif" n'est pas encore chargée

            // Appel axios (si 'estActif' vaut TRUE, alors on lui demande de passer à FALSE ; et vice-versa)
            axios.put(`${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/updateOne/${utilisateur._id}`, {estActif: !userEstActif}, { withCredentials: true })
            .then ((res) => {
                dispatch(enregistrerInfosUtilisateur(res.data))
                setUserEstActif(!userEstActif)
            })
            .catch((err) => {
                console.log("err", err)
            })
        }
    }

    const enregistreNouveauPseudo = () => {
        // Appel axios (enregistrement nouveau pseudo)
        axios.put(`${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/updateOne/${utilisateur._id}`, {pseudo: nouveauPseudo}, { withCredentials: true })
        .then ((res) => {
            if(!res.data.errors) {
                dispatch(enregistrerInfosUtilisateur(res.data));
                setPseudoEditable(false);
            } else {
                console.log("res.data.errors", res.data.errors)
                document.getElementById('msgErreurModificationPseudo').innerHTML = res.data.errors.pseudo.message;
            }
        })
        .catch((err) => {
            console.log("err", err)
            document.getElementById('msgErreurModificationPseudo').innerHTML = err;
        })
    }

    const rendPseudoEditable = () => {
        setNouveauPseudo(userPseudo);
        setPseudoEditable(true);
    }

    const checkToucheAppuyeeChampPseudo = (e) => {
        if(e.keyCode === 13) {
            enregistreNouveauPseudo();
        }
    }

    useEffect(() => {
        setUserPseudo(utilisateur.pseudo);
        setUserCreatedAt(dateParser(utilisateur.createdAt));
        setUserEmail(utilisateur.email);
        setUserEstActif(utilisateur.estActif);
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
                            <input type="text" className="main-container-profil-left-input" value={nouveauPseudo} onChange={(e) => setNouveauPseudo(e.target.value)} onKeyDown={(e) => checkToucheAppuyeeChampPseudo(e)} />
                            <div className="msgErreur" id="msgErreurModificationPseudo"></div>
                            <p className="main-container-profil-left-btn">
                                <button onClick={() => setPseudoEditable(false)}>Annuler édition pseudo</button>
                                <span>&nbsp;&nbsp;</span>
                                <button onClick={() => enregistreNouveauPseudo()}>Enregistrer modifications pseudo</button>
                            </p>
                        </>
                    )}
                    <p className="main-container-profil-left-label">→ Email de correspondance (non modifiable): </p>
                    <p className="main-container-profil-left-texte">{userEmail}</p>
                    <p className="main-container-profil-left-label">→ Envoi d'emails automatiques ? (chaque 1er du mois)</p>
                    <p className="main-container-profil-left-texte">{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'oui' : 'non')}</p>
                    <p className="main-container-profil-left-btn"><button onClick={() => modifieEnvoiDeEmailsAuto()}>{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'Désactiver l\'envoi d\'emails automatiques' : 'Activer l\'envoi d\'emails automatiques')}</button></p>
                </div>
                <div className="main-container-profil-right">
                    <p className="main-container-profil-right-title">Tâches à faire chaque mois</p>
                    <ul>
                        <li className="main-container-profil-right-tachesAfaire">
                            <p className="main-container-profil-right-tachesAfaire-title">Titre de la tâche à faire</p>
                            <p className="main-container-profil-right-tachesAfaire-description">Description de la tâche à
                                faire</p>
                            <p className="main-container-profil-right-tachesAfaire-btns">
                                <button>Éditer</button>
                                <span>&nbsp;&nbsp;</span>
                                <button>Supprimer</button>
                            </p>
                        </li>
                        <li className="main-container-profil-right-tachesAfaire">
                            <form action="">
                                <p className="main-container-profil-right-tachesAfaire-title">Ajouter une nouvelle tâche</p>
                                <p className="main-container-profil-right-tachesAfaire-description">
                                    <label htmlFor="titreTache">Titre nouvelle tâche : </label><br />
                                    <input type="text" name="titreTache" id="titreTache" /><br />
                                    <br />
                                    <label htmlFor="descriptionTache">Description nouvelle tâche : </label><br />
                                    <input type="text" name="descriptionTache" id="descriptionTache" /><br />
                                    <br />
                                </p>
                                <p className="main-container-profil-right-tachesAfaire-btns"><input type="button"
                                        value="Ajouter" className="btn" id="btnAjouterTache" />
                                </p>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageProfil;