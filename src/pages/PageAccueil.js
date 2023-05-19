import React from 'react';
import { useSelector } from 'react-redux';

const PageAccueil = () => {

    const utilisateur = useSelector((donnees) => donnees.user[0]);

    return (
        <div className="main-container">
            <p>ID utilisateur : {utilisateur.id}</p>
            <p>Pseudo : {utilisateur.pseudo}</p>
        </div>  
    );
};

export default PageAccueil;