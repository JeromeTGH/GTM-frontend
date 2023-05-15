import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import PgAccueil from '../../pages/pgAccueil';
import PgProfil from '../../pages/pgProfil';
import PgAfficheToutesLesListesDeTaches from '../../pages/pgAfficheToutesLesListesDeTaches';
import PgAfficheUneListeDeTaches from '../../pages/pgAfficheUneListeDeTaches';
import PgConnexion from '../../pages/pgConnexion';
import PgPointageTachesAfaire from '../../pages/pgPointageTachesAfaire';
import Pg404 from '../../pages/pg404';

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<PgAccueil />} />
                <Route path="/Profil" exact element={<PgProfil />} />
                <Route path="/AfficheToutesLesListesDeTaches" exact element={<PgAfficheToutesLesListesDeTaches />} />
                <Route path="/pgAfficheUneListeDeTaches" exact element={<PgAfficheUneListeDeTaches />} />
                <Route path="/Connexion" exact element={<PgConnexion />} />
                <Route path="/PointageTachesAfaire" exact element={<PgPointageTachesAfaire />} />
                <Route path="/404" exact element={<Pg404 />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default index; 