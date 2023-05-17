import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import PageAccueil from '../../pages/PageAccueil';
import PageProfil from '../../pages/PageProfil';
import PageAfficheToutesLesListesDeTaches from '../../pages/PageAfficheToutesLesListesDeTaches';
import PageAfficheUneListeDeTaches from '../../pages/PageAfficheUneListeDeTaches';
import PageConnexion from '../../pages/PageConnexion';
import PagePointageTachesAfaire from '../../pages/PagePointageTachesAfaire';
import Page404 from '../../pages/Page404';

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<PageAccueil />} />
                <Route path="/profil" exact element={<PageProfil />} />
                <Route path="/afficheToutesLesListesDeTaches" exact element={<PageAfficheToutesLesListesDeTaches />} />
                <Route path="/afficheUneListeDeTaches" exact element={<PageAfficheUneListeDeTaches />} />
                <Route path="/connexion" exact element={<PageConnexion />} />
                <Route path="/pointageTachesAfaire" exact element={<PagePointageTachesAfaire />} />
                <Route path="/404" exact element={<Page404 />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default index; 