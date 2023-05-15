import React from 'react';

const ConnexionLoginComponent = () => {
    return (
        <form action="">
            <p>~ Connexion ~</p>
            <label for="emailLogin">Email : </label>
            <input type="text" name="emailLogin" id="emailLogin" />
            <br />
            <label for="mdpLogin">Mot de passe : </label>
            <input type="text" name="mdpLogin" id="mdpLogin" />
            <br />
            <input type="button" value="Se connecter" className="btn" id="btnLogin" />
        </form>
    );
};

export default ConnexionLoginComponent;