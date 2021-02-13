import logo from "../../assets/images/logos/logo3.png"
import { Link } from 'react-router-dom'
import firebase from '../../firebaseElements/firebase'

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

function close() {
    firebase.auth().signOut().then(function () {
        console.log('Sign-out uccessful')
    }).catch(function (error) {
        // An error happened.
    });
}

function Navbargen() {
    return (
        <div>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src={logo} />
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
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
                            </div>
                        </div>
                        <a className="navbar-item">
                            <Link to={`${process.env.PUBLIC_URL}/nueva-venta`}>
                                Nueva Venta
                                    </Link>
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link onClick={close} to={`${process.env.PUBLIC_URL}`}>
                                    <a className="button is-link is-outlined">
                                        Cerrar Sesión
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    );
}
export default Navbargen;