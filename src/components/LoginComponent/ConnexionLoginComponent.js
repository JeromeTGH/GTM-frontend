import React, { useState } from 'react';
import axios from 'axios';

const ConnexionLoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const executeLogin = (e) => {
        e.preventDefault();

        const baliseMsgErreurEmail = document.getElementById('erreurEmailDeConnexion');
        const baliseMsgErreurPassword = document.getElementById('erreurPasswordDeConnexion');

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
            if(res.data.connexion === "reussie") {
                console.log('Connexion réussie !');
                window.location.replace('/');
            } else {
                console.log('Échec de connexion ...');
            }
        })
        .catch((error) => {
            if(error.response.status === 500) {
                baliseMsgErreurEmail.innerHTML = error.response.data.email;
                baliseMsgErreurPassword.innerHTML = error.response.data.password;
            } else {
                console.log(error)
            }
            //console.log('Erreur AXIOS, lors de la tentative de login')
        })
    }

    return (
        <form action="" onSubmit={executeLogin} id="frmConnexion">
            <p>~ Connexion ~</p>
            <label htmlFor="emailLogin">Email : </label>
            <input type="text" name="emailLogin" id="emailLogin" onChange={(e) => setEmail(e.target.value)} value={email} autocomplete="emailLogin" />
            <div className="msgErreur" id="erreurEmailDeConnexion"></div>
            <br />
            <label htmlFor="mdpLogin">Mot de passe : </label>
            <input type="password" name="mdpLogin" id="mdpLogin" onChange={(e) => setPassword(e.target.value)} value={password}  />
            <div className="msgErreur" id="erreurPasswordDeConnexion"></div>
            <br />
            <input type="submit" value="Se connecter" className="btn" id="btnLogin" />
        </form>
    );
};

export default ConnexionLoginComponent;