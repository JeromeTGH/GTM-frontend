import React, {useContext, useState} from 'react';
import ConnexionLoginComponent from './ConnexionLoginComponent';
import InscriptionLoginComponent from './InscriptionLoginComponent';
import { UseridContext } from '../AppContext';

const LoginComponent = (props) => {

    const userID = useContext(UseridContext);

    const [fenetreDeConnexionAuPremierPlan, metEnAvantFenetreDeConnexion] = useState(props.fenetreConnexionActive);         // Met à true ou false
    const [fenetreDeInscriptionAuPremierPlan, metEnAvantFenetreDeInscription] = useState(props.fenetreInscriptionActive);   // selon ce qui est passé
                                                                                                                            // en paramètre de la fct
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
            {
                userID ? (
                    window.location = '/'
                ) : (
                    <div className="loginblock">
                        <ul className="loginblock-switch">
                            <li id="seconnecter" onClick={changeDeFenetreLogin} className={fenetreDeConnexionAuPremierPlan ? "bouton-actif" : null}>Connexion</li>
                            <li id="sinscrire" onClick={changeDeFenetreLogin} className={fenetreDeInscriptionAuPremierPlan ? "bouton-actif" : null}>Inscription</li>
                        </ul>
                        {fenetreDeConnexionAuPremierPlan && <ConnexionLoginComponent />}
                        {fenetreDeInscriptionAuPremierPlan && <InscriptionLoginComponent />}
                    </div>
                )
            }      
        </main>
    );
};

export default LoginComponent;