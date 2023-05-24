import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dateParser } from '../../utils';
import PseudoProfil from './PseudoProfil';
import EnvoiEmailsAutoPseudo from './EnvoiEmailsAutoPseudo';
import AjoutTachePseudo from './AjoutTachePseudo';
import ModifierEffacerTachePseudo from './ModifierEffacerTachePseudo';

const PageProfil = () => {

    const valeur_initiale_chargement = '(en cours de chargement...)';
    const [userPseudo, setUserPseudo] = useState(valeur_initiale_chargement);
    const [userCreatedAt, setUserCreatedAt] = useState(valeur_initiale_chargement);
    const [userEmail, setUserEmail] = useState(valeur_initiale_chargement);

    const utilisateur = useSelector((donnees) => donnees.user[0]);

    useEffect(() => {
        setUserPseudo(utilisateur.pseudo);
        setUserCreatedAt(dateParser(utilisateur.createdAt));
        setUserEmail(utilisateur.email);
    }, [utilisateur])

    return (
        <div className="main-container">
            <div className="main-container-profil">
                <div className="main-container-profil-left">
                    <p className="main-container-profil-left-title">Profil de {userPseudo}</p>
                    <p className="main-container-profil-left-creationdate">Profil créé le {userCreatedAt}</p>
                    <p className="main-container-profil-left-label">→ Pseudo (cliquer dessus, pour modifier): </p>
                    <PseudoProfil />
                    <p className="main-container-profil-left-label">→ Email de correspondance (non modifiable): </p>
                    <p className="main-container-profil-left-texte">{userEmail}</p>
                    <p className="main-container-profil-left-label">→ Envoi d'emails automatiques ? (chaque 1er du mois)</p>
                    <EnvoiEmailsAutoPseudo />
                </div>
                <div className="main-container-profil-right">
                    <p className="main-container-profil-right-title">Tâches à faire chaque mois</p>
                    <ul>
                        <ModifierEffacerTachePseudo />
                        <li className="main-container-profil-right-tachesAfaire">
                            <AjoutTachePseudo />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageProfil;