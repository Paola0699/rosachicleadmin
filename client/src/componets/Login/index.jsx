import React, { useEffect } from "react";
import firebase from '../../firebaseElements/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './login.scss'
import logo from "./logo3.png"
import './estilos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

function Login() {
  const db = firebase.firestore();
  /*  useEffect(() => {
     --> esto estaba comentado tambien const db = firebase.firestore(); 
     db.collection("users").add({
       first: "Ada",
       last: "Lovelace",
       born: 1815
     }).then(function (docRef) {
       console.log("Document written with ID: ", docRef.id);
     }).catch(function (error) {
       console.error("Error adding document: ", error);
     });
   }, []); */

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // Display auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  return (
    <div className="App">

      {/* <h1>Hola aqui va a ir el login</h1>
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>  */}
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">

                  <div className="has-text-centered">
                    <img className="login-logo" src={logo} />
                    <h1 className="title" style={{ color: 'black' }}>Iniciar sesión</h1>
                    <h2 className="subtitle is-6" style={{ color: 'black' }}>Ingrese sus datos para continuar</h2>
                    <hr className="login-hr" />
                  </div>


                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input className="input" type="email" placeholder="Usuario" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </p>
                  </div>

                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input" type="password" placeholder="Contraseña" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </p>
                  </div>


                  <div className="field">
                    <button className="button is-success is-fullwidth ">
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Login;


