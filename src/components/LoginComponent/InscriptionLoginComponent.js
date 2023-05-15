import React from 'react';

const InscriptionLoginComponent = () => {
    return (
        <form action="">
            <p>~ Inscription ~</p>
            <label htmlFor="pseudoInscription">Pseudo : </label>
            <input type="text" name="pseudoInscription" id="pseudoInscription" />
            <br />
            <label htmlFor="emailInscription">Email : </label>
            <input type="text" name="emailInscription" id="emailInscription" />
            <br />
            <label htmlFor="mdpInscription">Mot de passe : </label>
            <input type="text" name="mdpInscription" id="mdpInscription" />
            <br />
            <input type="submit" value="S'inscrire" className="btn" id="btnInscription" />
        </form>
    );
};

export default InscriptionLoginComponent;