import React, { useEffect } from "react";
import firebase from '../../firebaseElements/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


function Login() {
  const db = firebase.firestore();
  useEffect(() => {
    /* const db = firebase.firestore(); */
    db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }, []);

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
      <h1>Hola aqui va a ir el login</h1>
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  );
}


export default Login;


