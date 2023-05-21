import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dateParser } from '../utils';

const PageProfil = () => {

    const valeur_initiale_chargement = '(en cours de chargement...)';
    const [userPseudo, setUserPseudo] = useState(valeur_initiale_chargement);
    const [userCreatedAt, setUserCreatedAt] = useState(valeur_initiale_chargement);
    const [userEmail, setUserEmail] = useState(valeur_initiale_chargement);
    const [userEstActif, setUserEstActif] = useState(valeur_initiale_chargement);

    const utilisateur = useSelector((donnees) => donnees.user[0]);

    useEffect(() => {
        setUserPseudo(utilisateur.pseudo);
        setUserCreatedAt(dateParser(utilisateur.createdAt));
        setUserEmail(utilisateur.email);
        setUserEstActif(utilisateur.email);
    }, [utilisateur])

    return (
        <div className="main-container">
            <div className="main-container-profil">
                <div className="main-container-profil-left">
                    <p className="main-container-profil-left-title">Bonjour {userPseudo} !</p>
                    <p className="main-container-profil-left-creationdate">Profil créé le {userCreatedAt}</p>
                    <p className="main-container-profil-left-label">→ Pseudo (cliquer dessus, pour modifier): </p>
                    <p className="main-container-profil-left-texte">{userPseudo}</p>
                    <p className="main-container-profil-left-btn"><button>Modifier pseudo</button></p>
                    <p className="main-container-profil-left-label">→ Email de correspondance (non modifiable): </p>
                    <p className="main-container-profil-left-texte">{userEmail}</p>
                    <p className="main-container-profil-left-label">→ Envoi d'email mensuel autorisé ?</p>
                    <p className="main-container-profil-left-texte">{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'oui' : 'non')}</p>
                    <p className="main-container-profil-left-btn"><button>{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'Désactiver l\'envoi d\'emails automatiques' : 'Activer l\'envoi d\'emails automatiques')}</button></p>
                </div>
                <div className="main-container-profil-right">
                    <p className="main-container-profil-right-title">Tâches à faire chaque mois</p>
                    <ul>
                        <li className="main-container-profil-right-tachesAfaire">
                            <p className="main-container-profil-right-tachesAfaire-title">Titre de la tâche à faire</p>
                            <p className="main-container-profil-right-tachesAfaire-description">Description de la tâche à
                                faire</p>
                            <p className="main-container-profil-right-tachesAfaire-btns">
                                <button>Éditer</button>&nbsp;
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