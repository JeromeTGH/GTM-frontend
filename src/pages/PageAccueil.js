import React, { useContext, useEffect } from 'react';
import  { useNavigate }  from 'react-router-dom';
import { UseridContext } from '../components/AppContext';

import HeaderComponent from '../components/HeaderComponent';
import MainComponent from '../components/MainComponent';
import FooterComponent from '../components/FooterComponent';

const PageAccueil = () => {

    const userID = useContext(UseridContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userID) {
            navigate('/connexion');
        }
    }, [navigate, userID])

    return (
        <React.Fragment>
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </React.Fragment>
    );
};

export default PageAccueil;