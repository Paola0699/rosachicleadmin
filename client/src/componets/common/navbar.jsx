import logo from "../../assets/images/logos/logo3.png"

function Navbar() {
    return (


        <div>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src={logo}/>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
        
                        <a className="navbar-item">
                            Balance General
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Ventas
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    Nueva Venta
                                </a>
                                <a className="navbar-item">
                                    Ventas Generales
                                </a>

                                <a className="navbar-item">
                                    Ventas por Categoria
                                </a>
                            </div>
                        </div>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Productos
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    Nuevo Producto
                                </a>
                                <a className="navbar-item">
                                    Todos los productos
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-link is-outlined">
                                    Cerrar Sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;