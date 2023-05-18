import React, { useContext, useEffect } from 'react';
import  { useNavigate }  from 'react-router-dom';
import { UseridContext } from '../components/AppContext';

const PageAccueil = () => {

    const userID = useContext(UseridContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userID) {
            navigate('/connexion');
        }
    }, [navigate, userID])

    return (
        <div className="main-container">
            <p>(contenu à venir)<br /><br /><br /><br /><br />(contenu à venir)</p>
            <p>(contenu à venir)<br /><br /><br /><br /><br />(contenu à venir)</p>
            <p>(contenu à venir)<br /><br /><br /><br /><br />(contenu à venir)</p>
        </div>  
    );
};

export default PageAccueil;