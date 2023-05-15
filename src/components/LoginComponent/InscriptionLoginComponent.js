import React from 'react';

const InscriptionLoginComponent = () => {
    return (
        <form action="">
            <p>~ Inscription ~</p>
            <label htmlFor="pseudoInscription">Pseudo : </label>
            <input type="text" name="pseudoInscription" id="pseudoInscription" autoComplete="pseudoIncription" />
            <br />
            <label htmlFor="emailInscription">Email : </label>
            <input type="text" name="emailInscription" id="emailInscription" autoComplete="emailIncription" />
            <br />
            <label htmlFor="mdpInscription">Mot de passe : </label>
            <input type="text" name="mdpInscription" id="mdpInscription" />
            <br />
            <input type="submit" value="S'inscrire" className="btn" id="btnInscription" />
        </form>
    );
};

export default InscriptionLoginComponent;