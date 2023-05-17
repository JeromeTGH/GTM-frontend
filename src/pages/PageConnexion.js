import React, { useContext } from 'react';
import { UseridContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

import NoheaderComponent from '../components/NoheaderComponent'
import LoginComponent from '../components/LoginComponent/LoginComponent';
import FooterComponent from '../components/FooterComponent';

const PageConnexion = () => {

    const userID = useContext(UseridContext);
    const navigate = useNavigate();

    return (
        userID ? (
            navigate('/')
        ) :
        (
            <React.Fragment>
                <NoheaderComponent />
                <LoginComponent fenetreConnexionActive={true} fenetreInscriptionActive={false} />
                <FooterComponent />
            </React.Fragment>
        )
    );
};

export default PageConnexion;