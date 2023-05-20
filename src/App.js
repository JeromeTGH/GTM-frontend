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
        // console.log("res.data", res.data);
        dispatch(enregistrerInfosUtilisateur({ id: res.data, pseudo: ''}));
        if(res.data === 0) {
          setisConnected(false);
          if(window.location.pathname !== '/connexion') {
            window.location = '/connexion'
          } else {
            setisLoading(false);
          }
        } else {
          setisConnected(true);
          setisLoading(false);
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
        (<div>Chargement de la page ...</div>) :
        (isConnected ?
            (<AppRoutes />) :
            (<><NoheaderComponent /><PageConnexion /><div></div></>)
        )
    }
    </>
  )
}

export default App;