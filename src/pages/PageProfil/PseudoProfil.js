import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { enregistrerInfosUtilisateur } from '../../redux/user.slice';


const PseudoProfil = () => {

    const valeur_initiale_chargement = '(en cours de chargement...)';
    const [userPseudo, setUserPseudo] = useState(valeur_initiale_chargement);
    const [pseudoEditable, setPseudoEditable] = useState(false);        // Par défaut, au lancement de cette page, le pseudo n'est pas "éditable"
    const [nouveauPseudo, setNouveauPseudo] = useState('');             // ou plus exactement, il faut cliquer dessus ou sur le btn, pour le modifier
    const [msgErreurModificationPseudo, setMsgErreurModificationPseudo] = useState('');

    const utilisateur = useSelector((donnees) => donnees.user[0]);
    const dispatch = useDispatch();


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

    useEffect(() => {
        setUserPseudo(utilisateur.pseudo);
    }, [utilisateur])

    return (
        <>
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
        </>
    );
};

export default PseudoProfil;