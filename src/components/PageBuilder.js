import React from 'react';

import NoheaderComponent from './NoheaderComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

import PageAccueil from '../pages/PageAccueil';
import PageProfil from '../pages/PageProfil';
import PageAfficheToutesLesListesDeTaches from '../pages/PageAfficheToutesLesListesDeTaches';
import PageAfficheUneListeDeTaches from '../pages/PageAfficheUneListeDeTaches';
// import PageConnexion from '../../pages/PageConnexion';
import PagePointageTachesAfaire from '../pages/PagePointageTachesAfaire';
import Page404 from '../pages/Page404';

const PageBuilder = (props) => {

    const withHeader = props.withHeader;
    const targetPage = props.targetPage;

    const renderSwitch = (parametre) => {
        switch(parametre) {
            case '/':
                return <PageAccueil />;
            case '/profil':
                return <PageProfil />;
            case '/afficheToutesLesListesDeTaches':
                return <PageAfficheToutesLesListesDeTaches />;
            case '/afficheUneListeDeTaches':
                return <PageAfficheUneListeDeTaches />;    
            // case '/connexion':
                // return <PageConnexion />;
            case '/pointageTachesAfaire':
                return <PagePointageTachesAfaire />;
            case '/404':
                return <Page404 />;
            default:
                return "<div>Page '" + parametre + "'inconnue (au niveau du builder)</div>";
        }
    }

    return (
        <>
            { withHeader === "no" ? 
                (<NoheaderComponent />)
             : (
                <HeaderComponent />
            )}

            <main>
                {renderSwitch(targetPage)}
            </main>

            <FooterComponent />
        </>
    );
};

export default PageBuilder;