import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ajouterUtilisateur } from '../store';

const PageAccueil = () => {

    const utilisateur = useSelector((donnees) => donnees.user);

    const dispatch = useDispatch();

    return (
        <div className="main-container">
            <p>***</p>
            <p onClick={() => {dispatch(ajouterUtilisateur({id: Date.now(), pseudo: "tutu"}))}}>Cliquez ici</p>
            <p>{console.log(utilisateur)}</p>
            <p>***</p>
        </div>  
    );
};

export default PageAccueil;