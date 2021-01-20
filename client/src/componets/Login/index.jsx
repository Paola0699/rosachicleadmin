import React, { useEffect, useState } from "react";
import firebase from '../../firebaseElements/firebase'
import './login.scss'
import logo from "../../assets/images/logos/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'

function Login() {
  const db = firebase.firestore();
  async function getUserType(user, setUserType) {
    const userType = await db.doc('accounts').collection("accounts").doc(user.uid).get()
    if (userType.exists)
      db.doc('accounts').collection("accounts").doc(user.uid).onSnapshot((doc) => {
        if (doc.data().type === 'admin')
          setUserType('admin')
      });
  }
  function singIn(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,'-----', errorMessage)
    });
  }

  const [userType, setUserType]= useState("")
  const [mail, setMail]= useState("")
  const [pass, setPass]= useState("")

  useEffect(() => {
    //firebase.auth().signOut()//ELIMINAR close sesion at refresh 
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        //getUserType(user, setUserType)
        console.log(`Hay un user ${user.email}`)
        setUserType(true)
      }
      else
        console.log('no user')
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    singIn(mail,pass)
}
  return userType ? <Redirect to={'productos'} /> :(
    <div className="App">
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-5-widescreen">
                <form action="" className="box" onSubmit={handleSubmit}>

                  <div className="has-text-centered">
                    <img className="login-logo" src={logo} />
                    <h1 className="title is-3" style={{ color: '#555' }}>Iniciar sesión</h1>
                    <h2 className="subtitle is-6" style={{ color: '#757575' }}>Ingrese sus datos para continuar</h2>
                    <hr className="login-hr" />
                  </div>

                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input onChange={e=>setMail(e.target.value)} className="input" type="email" placeholder="Usuario" />
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
                      <input onChange={e=>setPass(e.target.value)} className="input" type="password" placeholder="Contraseña" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </p>
                  </div>

                  <hr className="login-hr" />
                  <div className="field">
                    <button type="submit" value="Submit"  className="button is-success is-fullwidth ">
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


