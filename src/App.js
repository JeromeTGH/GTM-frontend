import React from 'react';
import AppRoutes from './components/AppRoutes';
// import { useSelector } from 'react-redux';

const App = () => {

  // const utilisateur = useSelector((donnees) => donnees.user[0]);

  // useEffect(() => {
  //   console.log('Render App.js')

  // }, [])


  const checkCookieAndStartRouting = () => {

    // Interrogation de l'API (lecture du cookie, et retourne 0 ou l'ID de l'utilisateur)


    // Si 0 a été retourné, alors redirection vers la page connexion si on n'est pas dessus, sinon lancer AppRoute


    // Si ID retourné, alors lancement de AppRoute directement


    return <div>Ici3</div>
    // console.log('verifCookiePuisIdEventuel');
    //   console.log('Cookie présent ?', Cookies.get('cookieJetonJWT'));
    //   if(Cookies.get('cookieJetonJWT')) {
    //     console.log("Cookie 'cookieJetonJWT' présent !");
    //     return <AppRoutes />            
    //   } else {
    //     console.log("Cookie 'cookieJetonJWT' absent ...");
    //     if(window.location.pathname === '/connexion')
    //       return <AppRoutes />
    //     else
    //       //window.location = '/connexion'
    //       return <div>Ici2</div>
    //   }
  }

  return (
    <React.Fragment>
      {checkCookieAndStartRouting()}
    </React.Fragment>
  );
};

//   <p>{console.log('Initialisation')}</p>
//   ) : (
//   <p>{console.log('intérieur App.js')}</p>
//     <AppRoutes />
// )}
export default App;