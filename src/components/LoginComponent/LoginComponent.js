import React, {useState} from 'react';
import ConnexionLoginComponent from './ConnexionLoginComponent';
import InscriptionLoginComponent from './InscriptionLoginComponent';

const LoginComponent = () => {

    const [fenetreDeConnexionAuPremierPlan, metEnAvantFenetreDeConnexion] = useState(true);
    const [fenetreDeInscriptionAuPremierPlan, metEnAvantFenetreDeInscription] = useState(false);

    const changeDeFenetreLogin = (e) => {
        if(e.target.id === "seconnecter") {
            metEnAvantFenetreDeConnexion(true);
            metEnAvantFenetreDeInscription(false);
        }
        else if(e.target.id === "sinscrire") {
            metEnAvantFenetreDeConnexion(false);
            metEnAvantFenetreDeInscription(true);
        }
    }

    return (
        <main>
            <div className="loginblock">
                <ul className="loginblock-switch">
                    <li id="seconnecter" onClick={changeDeFenetreLogin} className={fenetreDeConnexionAuPremierPlan ? "active-btn" : null}>Connexion</li>
                    <li id="sinscrire" onClick={changeDeFenetreLogin} className={fenetreDeInscriptionAuPremierPlan ? "active-btn" : null}>Inscription</li>
                </ul>
                {fenetreDeConnexionAuPremierPlan && <ConnexionLoginComponent />}
                {fenetreDeInscriptionAuPremierPlan && <InscriptionLoginComponent />}
            </div>
        </main>
    );
};

export default LoginComponent;