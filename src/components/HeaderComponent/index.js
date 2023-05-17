import React from 'react';

const index = () => {
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
                    <button id="btnLogInOut">Se&nbsp;déconnecter</button>
                </div>
            </div>
        </header>
    );
};

export default index;