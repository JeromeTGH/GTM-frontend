import React, { useContext } from 'react';
import { UseridContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

import HeaderComponent from '../components/HeaderComponent';
import MainComponent from '../components/MainComponent';
import FooterComponent from '../components/FooterComponent';



const PageAccueil = () => {

    const userID = useContext(UseridContext);
    const navigate = useNavigate();

    return (
        userID ? (
            <React.Fragment>
                <HeaderComponent />
                <MainComponent />
                <FooterComponent />
            </React.Fragment>
        ) : (
            navigate('/connexion')
        )
    );
};

export default PageAccueil;