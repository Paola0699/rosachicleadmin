import logo from "../../assets/images/logos/logo3.png"
import { Link } from 'react-router-dom'
import firebase from '../../firebaseElements/firebase'
import { useEffect, useState } from "react";


function close() {
    firebase.auth().signOut().then(function () {
        console.log('Sign-out uccessful')
    }).catch(function (error) {
        // An error happened.
    });
}

function Navbar() {
    const [isActive, setisActive] = useState(false);
    return (
        <div>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
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
                            <a className="navbar-link">
                                Productos
                            </a>

                            <div className="navbar-dropdown">
                                <Link to={`${process.env.PUBLIC_URL}/producto`}>
                                    <a className="navbar-item">
                                        Nuevo Producto
                                    </a>
                                </Link>
                                <Link to={`${process.env.PUBLIC_URL}/productos`}>
                                    <a className="navbar-item">
                                        Todos los productos
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Gastos e Ingresos
                            </a>

                            <div className="navbar-dropdown">
                                <Link to={`${process.env.PUBLIC_URL}/alta-gasto`}>
                                    <a className="navbar-item">
                                        Alta de Gastos e Ingresos
                                    </a>
                                </Link>
                                <Link to={`${process.env.PUBLIC_URL}/gastos`}>
                                    <a className="navbar-item">
                                        Consultar Gastos e Ingresos
                                    </a>
                                </Link>
                                <Link to={`${process.env.PUBLIC_URL}/balance-general`}>
                                    <a className="navbar-item">
                                        Balance General
                            </a>
                                </Link>
                            </div>
                        </div>


                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Ventas
                            </a>

                            <div className="navbar-dropdown">
                                <Link to={`${process.env.PUBLIC_URL}/nueva-venta`}>
                                    <a className="navbar-item">
                                        Nueva Venta
                                </a>
                                </Link>
                                <Link to={`${process.env.PUBLIC_URL}/ventas`}>
                                    <a className="navbar-item">
                                        Ventas Generales
                                </a>
                                </Link>
                                <Link to={`${process.env.PUBLIC_URL}/ventas-desglosado`}>
                                    <a className="navbar-item">
                                        Ventas por Categoria
                                </a>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link onClick={close} to={`${process.env.PUBLIC_URL}`}>
                                    <a className="button is-success is-outlined">
                                        Cerrar Sesión
                                    </a>
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