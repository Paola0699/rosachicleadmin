import logo from "../../assets/images/logos/logo3.png";
import { Link } from "react-router-dom";
import firebase from "../../firebaseElements/firebase";
import { useState } from "react";

function close() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Sign-out uccessful");
    })
    .catch(function (error) {
      // An error happened.
    });
}

function Navbar() {
  const [isActive, setisActive] = useState(false);
  return (
    <div>
      <nav
        className="navbar is-warning"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/productos">
            <img src={logo} />
          </a>
          <a
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => {
              setisActive(!isActive);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Productos</a>

              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/producto`}
                >
                  Nuevo Producto
                </Link>
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/productos`}
                >
                  Todos los productos
                </Link>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Gastos e Ingresos</a>

              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/alta-gasto`}
                >
                  Alta de Gastos e Ingresos
                </Link>
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/gastos`}
                >
                  Consultar Gastos e Ingresos
                </Link>
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/balance-general`}
                >
                  Balance General
                </Link>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Ventas</a>

              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/nueva-venta`}
                >
                  Nueva Venta
                </Link>
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/ventas`}
                >
                  Ventas Generales
                </Link>
                <Link
                  className="navbar-item"
                  to={`${process.env.PUBLIC_URL}/ventas-desglosado`}
                >
                  Ventas por Categoria
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  className="button is-success is-outlined"
                  onClick={close}
                  to={`${process.env.PUBLIC_URL}`}
                >
                  Cerrar Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
