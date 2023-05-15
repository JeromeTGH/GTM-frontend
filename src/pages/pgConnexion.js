import React from 'react';
import NoheaderComponent from '../components/NoheaderComponent'
import LoginComponent from '../components/LoginComponent';
import FooterComponent from '../components/FooterComponent';

const pgConnexion = () => {
    return (
        <React.Fragment>
            <NoheaderComponent />
            <LoginComponent />
            <FooterComponent />
        </React.Fragment>
    );
};

export default pgConnexion;