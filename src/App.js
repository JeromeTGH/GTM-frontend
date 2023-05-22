import React, { useState, useEffect } from 'react';
import AppRoutes from './components/AppRoutes';
import { useDispatch } from 'react-redux';
import { enregistrerInfosUtilisateur } from './redux/user.slice';

import axios from 'axios';

import NoheaderComponent from './components/NoheaderComponent';
import PageConnexion from './pages/PageConnexion';

const App = () => {
 
  const dispatch = useDispatch();
  
  const [isLoading, setisLoading] = useState(true);
  const [isConnected, setisConnected] = useState(false);

  
  useEffect(() => {

    const interrogeAPI = () => {
      axios.get(`${process.env.REACT_APP_URL_DE_LAPI}/getUserIdSiCookieJwtConforme`, { withCredentials: true })
      .then ((res) => {
        if(res.data === 0) {
          // Aucun utilisateur connecté, si on passe ici
          setisConnected(false);
          if(window.location.pathname !== '/connexion') {
            window.location = '/connexion'                      // On va sur la page /connexion, pour se connecter
          } else {
            setisLoading(false);                                // On est déjà sur la page /connexion, on y reste, pour se connecter
          }
        } else {
          // Il y a un utilisateur connecté, si on passe ici
          axios.get(`${process.env.REACT_APP_URL_DE_LAPI}/api/utilisateurs/getOne/${res.data}`, { withCredentials: true })
          .then ((res) => {
            // On récupère les infos utlisateur, et on les place dans le store
            dispatch(enregistrerInfosUtilisateur(res.data));
            // dispatch(enregistrerInfosUtilisateur({
            //   _id: res.data._id,
            //   pseudo: res.data.pseudo,
            //   email: res.data.email,
            //   estActif: res.data.estActif,
            //   tachespossibles: res.data.tachespossibles,
            //   createdAt: res.data.createdAt,
            //   updatedAt: res.data.updatedAt
            // }));
            setisConnected(true);
            setisLoading(false);
          })
          .catch((err) => {
            console.log("err", err)
          })
        }
      })
      .catch((err) => {
        console.log("err", err)
      })
    }

    interrogeAPI();
  }, [dispatch]);

  return (
    <>
    {
      isLoading ?
        (<div>Chargement de la page en cours ...</div>) :
        (isConnected ?
            (<AppRoutes />) :
            (<><NoheaderComponent /><PageConnexion /><div></div></>)
        )
    }
    </>
  )
}

export default App;