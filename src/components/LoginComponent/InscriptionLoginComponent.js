import React from 'react';

const InscriptionLoginComponent = () => {
    return (
        <form action="">
            <p>~ Inscription ~</p>
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
    );
};

export default InscriptionLoginComponent;