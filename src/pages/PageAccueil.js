import React from 'react';
// import React, { useContext, useEffect } from 'react';
// import  { useNavigate }  from 'react-router-dom';
// import { UseridContext } from '../components/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { ajouterUtilisateur } from '../store';

const PageAccueil = () => {

    // const userID = useContext(UseridContext);
    // const navigate = useNavigate();

    const utilisateur = useSelector((donnees) => donnees.user);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(!userID) {
    //         navigate('/connexion');
    //     }
    // }, [navigate, userID])

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