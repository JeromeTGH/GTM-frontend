import React from 'react';
import { useSelector } from 'react-redux';
import { dateParser } from '../utils';

const PageProfil = () => {

    const utilisateur = useSelector((donnees) => donnees.user[0]);

    return (
        <div className="main-container">
            <div className="main-container-profil">
                <div className="main-container-profil-left">
                    <p className="main-container-profil-left-title">Bonjour {utilisateur.pseudo} !</p>
                    <p className="main-container-profil-left-creationdate">Profil créé le {dateParser(utilisateur.createdAt)}</p>
                    <p className="main-container-profil-left-label">→ Pseudo (cliquer dessus, pour modifier): </p>
                    <p className="main-container-profil-left-texte">{utilisateur.pseudo}</p>
                    <p className="main-container-profil-left-btn"><button>Modifier pseudo</button></p>
                    <p className="main-container-profil-left-label">→ Email de correspondance (non modifiable): </p>
                    <p className="main-container-profil-left-texte">{utilisateur.email}</p>
                    <p className="main-container-profil-left-label">→ Envoi d'email mensuel autorisé ?</p>
                    <p className="main-container-profil-left-texte">{utilisateur.estActif ? 'oui' : 'non'}</p>
                    <p className="main-container-profil-left-btn"><button>{utilisateur.estActif ? 'Désactiver l\'envoi d\'emails automatiques' : 'Activer l\'envoi d\'emails automatiques'}</button></p>
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