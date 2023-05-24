import React from 'react';

import NoheaderComponent from '../sharedComponents/NoheaderComponent';
import HeaderComponent from '../sharedComponents/HeaderComponent';
import FooterComponent from '../sharedComponents/FooterComponent';

import PageAccueil from './PageAccueil/PageAccueil';
import PageProfil from './PageProfil/PageProfil';
import PageAfficheToutesLesListesDeTaches from './PageAfficheToutesLesListesDeTaches/PageAfficheToutesLesListesDeTaches';
import PageAfficheUneListeDeTaches from './PageAfficheUneListeDeTaches/PageAfficheUneListeDeTaches';
import Page404 from './Page404/Page404';

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