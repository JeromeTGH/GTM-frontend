import React, { useState } from 'react';
import axios from 'axios';

const InscriptionLoginComponent = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const executeInscription = (e) => {
        e.preventDefault();

        const baliseMsgErreurPseudo = document.getElementById('erreurPseudoDeInscription');
        const baliseMsgErreurEmail = document.getElementById('erreurEmailDeInscription');
        const baliseMsgErreurPassword = document.getElementById('erreurPasswordDeInscription');
        const baliseMsgErreurConfirmPassword = document.getElementById('erreurConfirmPasswordDeInscription');
        const baliseMsgErreurFrmInscription = document.getElementById('msgErreurFrmInscription');
        const baliseMsgSuccessFrmInscription = document.getElementById('msgSuccessFrmInscription');

        baliseMsgErreurPseudo.innerHTML = '';
        baliseMsgErreurEmail.innerHTML = '';
        baliseMsgErreurPassword.innerHTML = '';
        baliseMsgErreurConfirmPassword.innerHTML = '';
        baliseMsgErreurFrmInscription.innerHTML = '';
        baliseMsgSuccessFrmInscription.innerHTML = '';

        if(password !== confirmPassword) {
            baliseMsgErreurConfirmPassword.innerHTML = 'Les mots de passe ne correspondent pas';
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
                    baliseMsgErreurPseudo.innerHTML = res.data.pseudo;
                    baliseMsgErreurEmail.innerHTML = res.data.email;
                    baliseMsgErreurPassword.innerHTML = res.data.password;
                } else {
                    baliseMsgSuccessFrmInscription.innerHTML = '<br />Inscription réussie, tentative de connexion automatique en cours...';
    
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
                        baliseMsgErreurFrmInscription.innerHTML = '<br />' + erreur;
                        console.log(erreur)
                    })
                }
            })
            .catch((erreur) => {
                baliseMsgErreurFrmInscription.innerHTML = '<br />' + erreur;
                console.log(erreur)
            })    
        }
    }

    return (
        <form action="" onSubmit={executeInscription} id="frmInscription">
            <p>~ Inscription ~</p>

            <label htmlFor="pseudoInscription">Pseudo : </label>
            <input type="text" name="pseudoInscription" id="pseudoInscription" onChange={(e) => setPseudo(e.target.value)} value={pseudo} autoComplete="pseudoInscription" />
            <div className="msgErreur" id="erreurPseudoDeInscription"></div>
            <br />

            <label htmlFor="emailInscription">Email : </label>
            <input type="text" name="emailInscription" id="emailInscription" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="emailInscription" />
            <div className="msgErreur" id="erreurEmailDeInscription"></div>
            <br />

            <label htmlFor="mdpInscription">Mot de passe : </label>
            <input type="password" name="mdpInscription" id="mdpInscription" onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="msgErreur" id="erreurPasswordDeInscription"></div>
            <br />

            <label htmlFor="mdpConfirmInscription">Confirmation mot de passe : </label>
            <input type="password" name="mdpConfirmInscription" id="mdpConfirmInscription" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <div className="msgErreur" id="erreurConfirmPasswordDeInscription"></div>
            <br />

            <input type="submit" value="S'inscrire" className="btn" id="btnInscription" />
            <div className="msgErreur alignCenter" id="msgErreurFrmInscription"></div>
            <div className="msgSuccess alignCenter" id="msgSuccessFrmInscription"></div>
        </form>
    );
};

export default InscriptionLoginComponent;