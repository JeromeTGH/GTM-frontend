import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UseridContext } from './components/AppContext';
import axios from 'axios';

const App = () => {

  const [uid, setUid] = useState(null);

  useEffect( () => {

    const rechercheToken = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_DE_LAPI}/getUserIdSiCookieJwtConforme`,
        withCredentials: true
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((erreur) => {
        console.log("Aucun token");
      })  
    }

    rechercheToken();
  }, [uid])

  return (
    <React.Fragment>
      <UseridContext.Provider value={uid}>
        <Routes />
      </UseridContext.Provider>
    </React.Fragment>
  );
};

export default App;