import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import PageBuilder from './PageBuilder';

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={
                    <PageBuilder withHeader="yes" targetPage="/" />} />
                <Route path="/profil" exact element={
                    <PageBuilder withHeader="yes" targetPage="/profil" />} />
                <Route path="/afficheToutesLesListesDeTaches" exact element={
                    <PageBuilder withHeader="yes" targetPage="/afficheToutesLesListesDeTaches" />} />
                <Route path="/afficheUneListeDeTaches" exact element=
                    {<PageBuilder withHeader="yes" targetPage="/afficheUneListeDeTaches" />} />
                <Route path="/connexion" exact element={
                    <PageBuilder withHeader="no" targetPage="/connexion" />} />
                <Route path="/pointageTachesAfaire" exact element={
                    <PageBuilder withHeader="yes" targetPage="/pointageTachesAfaire" />} />
                <Route path="/404" exact element={
                    <PageBuilder withHeader="yes" targetPage="/404" />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes; 