import React, { useEffect, useState } from "react";
import firebase from '../../firebaseElements/firebase'
import './login.scss'
import logo from "../../assets/images/logos/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik';
import { loginValidationSchema } from "../../validationSchema/loginValidationSchema";

function Login() {
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      USER: '',
      PASSWORD: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const {USER, PASSWORD} = values;
      singIn(USER, PASSWORD);
    }
  });
  const singIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError({
            errorCode,
            errorMessage,
        })
      });
}
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(`Hay un user ${user.email}`);
        setUserType(true);
      }
      else
        console.log('no user')
    });
  }, []);

  return userType ? <Redirect to={'productos'} /> : (
    <div className="App">
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-5-widescreen">
                <form action="" className="box" onSubmit={formik.handleSubmit}>
                  <div className="has-text-centered">
                    <img alt='logo' className="login-logo" src={logo} />
                    <h1 className="title is-3" style={{ color: '#555' }}>Iniciar sesión</h1>
                    <h2 className="subtitle is-6" style={{ color: '#757575' }}>Ingrese sus datos para continuar</h2>
                    <hr className="login-hr" />
                  </div>
                  
                  {error && <div className="notification is-danger is-light">
                    <strong>{error.errorCode} </strong>
                    {error.errorMessage}
                  </div> }
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input value={formik.values.USER} onChange={formik.handleChange}  id="USER" name="USER" className={formik.touched.USER && Boolean(formik.errors.USER) ? "input is-danger" : 'input'} type="email" placeholder="Usuario" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </p>
                    <p className="help is-danger">{formik.touched.USER && formik.errors.USER}</p>
                  </div>

                  <div className="field">
                    <p className="control has-icons-left">
                      <input  id="PASSWORD" name="PASSWORD" value={formik.values.PASSWORD} onChange={formik.handleChange} className={formik.touched.PASSWORD && Boolean(formik.errors.PASSWORD) ? "input is-danger" : 'input'} type="password" placeholder="Contraseña" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </p>
                    <p className="help is-danger">{formik.touched.PASSWORD && formik.errors.PASSWORD}</p>
                  </div>

                  <hr className="login-hr" />
                  <div className="field">
                    <button type="submit" value="Submit" className="button is-success is-fullwidth ">
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
