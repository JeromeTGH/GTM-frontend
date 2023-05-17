import React from 'react';
import axios from 'axios';

const HeaderComponent = () => {
    
    const seDeconnecter = () => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/postLogout`,
            withCredentials: true,
            data: {}
        })
        .then((res) => {
            window.location = '/';
        })
        .catch((erreur) => {
            console.log(erreur)
        })
    }

    return (
        <header>
            <div className="header-container">
                <div className="header-container-logo">
                    <a href="/">Site&nbsp;GTM</a>
                </div>
                <nav className="header-container-navmenu">
                    <ul className="header-container-navmenu-ul">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/AfficheToutesLesListesDeTaches">Voir toutes les listes de tâches à faire</a></li>
                        <li><a href="/Profil">Voir profil</a></li>
                    </ul>
                </nav>
                <div className="header-container-btnLogInOut">
                    <button id="btnLogInOut" onClick={seDeconnecter}>Se&nbsp;déconnecter</button>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;