import React from 'react';
import NoheaderComponent from '../components/NoheaderComponent'
import LoginComponent from '../components/LoginComponent/LoginComponent';
import FooterComponent from '../components/FooterComponent';

const pgConnexion = () => {
    return (
        <React.Fragment>
            <NoheaderComponent />
            <LoginComponent fenetreConnexionActive={true} fenetreInscriptionActive={false} />
            <FooterComponent />
        </React.Fragment>
    );
};

export default pgConnexion;