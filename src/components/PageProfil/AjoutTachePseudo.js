import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { enregistrerInfosUtilisateur } from '../../redux/user.slice';

const AjoutTachePseudo = () => {

    // const valeur_initiale_chargement = '(en cours de chargement...)';
    const [msgErreurFrmAddTask, setMsgErreurFrmAddTask] = useState('');
    const [titreTacheAajouter, setTitreTacheAajouter] = useState('');
    const [descriptionTacheAajouter, setDescriptionTacheAajouter] = useState('');

    const utilisateur = useSelector((donnees) => donnees.user[0]);
    const dispatch = useDispatch();

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

    return (
        <>
            <form onSubmit={ajouteNouvelleTache}>
                <p className="main-container-profil-right-tachesAfaire-title">Ajouter une nouvelle tâche</p>
                <p className="main-container-profil-right-tachesAfaire-description">
                    <label htmlFor="titreTache">Titre nouvelle tâche : </label><br />
                    <input type="text" name="titreTache" id="titreTache" value={titreTacheAajouter} onChange={(e) => setTitreTacheAajouter(e.target.value)} /><br />
                    <br />
                    <label htmlFor="descriptionTache">Description nouvelle tâche : </label><br />
                    <input type="text" name="descriptionTache" id="descriptionTache" value={descriptionTacheAajouter} onChange={(e) => setDescriptionTacheAajouter(e.target.value)} /><br />
                    <br />
                </p>
                <p className="main-container-profil-right-tachesAfaire-btns-3">
                    <button type="submit">Ajouter</button>
                </p>
                <div className="msgErreur alignCenter mt1rem4">{msgErreurFrmAddTask}</div>
            </form>
        </>
    );
};

export default AjoutTachePseudo;