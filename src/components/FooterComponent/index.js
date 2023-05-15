import React from 'react';

const index = () => {
    return (
        <div className="footer-container">
            <div>
                <p className="souligne">Site GTM (partie prépa. CSS)</p>
                <p>@2023 Copyright</p>
                <p>Nota : apprentissage SASS / non responsive</p>
            </div>
            <div>
                <div>
                    <p className="souligne">Liens rapides</p>
                    <p>→ Page d'accueil du site : <a href="/">Acceuil site GTM</a></p>
                    <p>→ Lien projet, sur GitHub : <a href="https://github.com/JeromeTGH/GTM-css-design?gtmSrc=pgEnd"
                            target="_blank" rel="noreferrer">Voir
                            projet sur GitHub</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default index;