import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { enregistrerInfosUtilisateur } from '../../redux/user.slice';

const EnvoiEmailsAutoPseudo = () => {

    const valeur_initiale_chargement = '(en cours de chargement...)';
    const [userEstActif, setUserEstActif] = useState(valeur_initiale_chargement);
    const [msgErreurModificationEnvoiEmail, setMsgErreurModificationEnvoiEmail] = useState('');

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

    useEffect(() => {
        setUserEstActif(utilisateur.estActif);
    }, [utilisateur])

    return (
        <>
            <p className="main-container-profil-left-texte">{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'oui' : 'non')}</p>
            <p className="main-container-profil-left-btn"><button onClick={() => modifieEnvoiDeEmailsAuto()}>{userEstActif === valeur_initiale_chargement ? valeur_initiale_chargement : (userEstActif ? 'Désactiver l\'envoi d\'emails automatiques' : 'Activer l\'envoi d\'emails automatiques')}</button></p>
            <div className="msgErreur alignCenter mt1rem4">{msgErreurModificationEnvoiEmail}</div>
        </>
    );
};

export default EnvoiEmailsAutoPseudo;