import React, { useState } from 'react';
import axios from 'axios';

const InscriptionLoginComponent = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [msgErreurPseudoInscription, setMsgErreurPseudoInscription] = useState('');
    const [msgErreurEmailInscription, setMsgErreurEmailInscription] = useState('');
    const [msgErreurPasswordInscription, setMsgErreurPasswordInscription] = useState('');
    const [msgErreurConfirmPasswordInscription, setMsgErreurConfirmPasswordInscription] = useState('');
    const [msgErreurFrmInscription, setMsgErreurFrmInscription] = useState('');
    const [msgSuccessFrmInscription, setMsgSuccessFrmInscription] = useState('');


    const executeInscription = (e) => {
        e.preventDefault();

        setMsgErreurPseudoInscription('');
        setMsgErreurEmailInscription('');
        setMsgErreurPasswordInscription('');
        setMsgErreurConfirmPasswordInscription('');
        setMsgErreurFrmInscription('');
        setMsgSuccessFrmInscription('');

        if(password !== confirmPassword) {
            setMsgErreurConfirmPasswordInscription('Les mots de passe ne correspondent pas');
        } else {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/postCreateUser`,
                withCredentials: true,
                data: {
                    pseudo: pseudo,
                    email: email,
                    password: password
                }
            })
            .then((res) => {
                if(res.data.pseudo || res.data.email || res.data.password) {
                    setMsgErreurPseudoInscription(res.data.pseudo);
                    setMsgErreurEmailInscription(res.data.email);
                    setMsgErreurPasswordInscription(res.data.password);
                } else {
                    setMsgSuccessFrmInscription('<br />Inscription réussie, tentative de connexion automatique en cours...');
    
                    // Tentative de connexion immédiate, après inscription
                    axios({
                        method: "post",
                        url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/postLogin`,
                        withCredentials: true,
                        data: {
                            email: email,
                            password: password
                        }
                    })
                    .then((res) => {
                        if(res.data.email || res.data.password) {
                            console.log(res)
                        } else {
                            console.log('Connexion réussie !');
                            window.location = '/';
                        }
                    })
                    .catch((erreur) => {
                        setMsgErreurFrmInscription(erreur.message);
                        console.log(erreur)
                    })
                }
            })
            .catch((erreur) => {
                setMsgErreurFrmInscription(erreur.message);
                console.log(erreur)
            })    
        }
    }

    return (
        <form action="" onSubmit={executeInscription} id="frmInscription">
            <p>~ Inscription ~</p>

            <label htmlFor="pseudoInscription">Pseudo : </label>
            <input type="text" name="pseudoInscription" id="pseudoInscription" onChange={(e) => setPseudo(e.target.value)} value={pseudo} autoComplete="pseudoInscription" />
            <div className="msgErreur">{msgErreurPseudoInscription}</div>
            <br />

            <label htmlFor="emailInscription">Email : </label>
            <input type="text" name="emailInscription" id="emailInscription" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="emailInscription" />
            <div className="msgErreur">{msgErreurEmailInscription}</div>
            <br />

            <label htmlFor="mdpInscription">Mot de passe : </label>
            <input type="password" name="mdpInscription" id="mdpInscription" onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="msgErreur">{msgErreurPasswordInscription}</div>
            <br />

            <label htmlFor="mdpConfirmInscription">Confirmation mot de passe : </label>
            <input type="password" name="mdpConfirmInscription" id="mdpConfirmInscription" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <div className="msgErreur">{msgErreurConfirmPasswordInscription}</div>
            <br />

            <input type="submit" value="S'inscrire" className="btn" id="btnInscription" />
            <div className="msgErreur alignCenter mt1rem4">{msgErreurFrmInscription}</div>
            <div className="msgSuccess alignCenter mt1rem4">{msgSuccessFrmInscription}</div>
        </form>
    );
};

export default InscriptionLoginComponent;