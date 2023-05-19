import React, { useState } from 'react';
import axios from 'axios';

const ConnexionLoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const executeLogin = (e) => {
        e.preventDefault();

        const baliseMsgErreurEmail = document.getElementById('erreurEmailDeConnexion');
        const baliseMsgErreurPassword = document.getElementById('erreurPasswordDeConnexion');
        const baliseMsgErreurFrmConnexion = document.getElementById('msgErreurFrmConnexion');

        baliseMsgErreurFrmConnexion.innerHTML = '';

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
                baliseMsgErreurEmail.innerHTML = res.data.email;
                baliseMsgErreurPassword.innerHTML = res.data.password;
            } else {
                window.location = '/';      // Pas de useNavigate ici, pour bien charger "l'environnement connecté"
            }
        })
        .catch((erreur) => {
            baliseMsgErreurFrmConnexion.innerHTML = '<br />' + erreur;
            console.log(erreur)
        })
    }

    return (
        <form action="" onSubmit={executeLogin} id="frmConnexion">
            <p>~ Connexion ~</p>
            <label htmlFor="emailLogin">Email : </label>
            <input type="text" name="emailLogin" id="emailLogin" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="emailLogin" />
            <div className="msgErreur" id="erreurEmailDeConnexion"></div>
            <br />
            <label htmlFor="mdpLogin">Mot de passe : </label>
            <input type="password" name="mdpLogin" id="mdpLogin" onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="msgErreur" id="erreurPasswordDeConnexion"></div>
            <br />
            <input type="submit" value="Se connecter" className="btn" id="btnLogin" />
            <div className="msgErreur alignCenter" id="msgErreurFrmConnexion"></div>
        </form>
    );
};

export default ConnexionLoginComponent;