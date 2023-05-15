import React from 'react';

const index = () => {
    return (
        <div className="loginblock">
            <div className="loginblock-switch">
                <button>Connexion</button>
                <button className="inactif">Inscription</button>
            </div>
            <form action="">
                <label for="emailLogin">Email : </label>
                <input type="text" name="emailLogin" id="emailLogin" />
                <br />
                <label for="mdpLogin">Mot de passe : </label>
                <input type="text" name="mdpLogin" id="mdpLogin" />
                <br />
                <input type="button" value="Se connecter" className="btn" id="btnLogin" />
            </form>
            <form action="">
                <label for="pseudoInscription">Pseudo : </label>
                <input type="text" name="pseudoInscription" id="pseudoInscription" />
                <br />
                <label for="emailInscription">Email : </label>
                <input type="text" name="emailInscription" id="emailInscription" />
                <br />
                <label for="mdpInscription">Mot de passe : </label>
                <input type="text" name="mdpInscription" id="mdpInscription" />
                <br />
                <input type="button" value="S'inscrire" className="btn" id="btnInscription" />
            </form>
        </div>
    );
};

export default index;