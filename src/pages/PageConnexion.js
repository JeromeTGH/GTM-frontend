import React from 'react';
// import React, { useContext, useEffect } from 'react';
// import  { useNavigate }  from 'react-router-dom';
// import { UseridContext } from '../components/AppContext';

// import NoheaderComponent from '../components/NoheaderComponent'
import LoginComponent from '../components/LoginComponent/LoginComponent';
// import FooterComponent from '../components/FooterComponent';

const PageConnexion = () => {

    // const userID = useContext(UseridContext);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if(userID) {
    //         navigate('/');
    //     }
    // }, [navigate, userID])

    return (
        <LoginComponent fenetreConnexionActive={true} fenetreInscriptionActive={false} />
    );
};

export default PageConnexion;