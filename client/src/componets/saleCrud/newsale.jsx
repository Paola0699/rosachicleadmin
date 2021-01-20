import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

function Newsale() {
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Nueva Venta</h1>
                        <h2 class="subtitle">Generar Venta</h2>
                        <Breadcrum />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className="column">
                            <label>Seleccione Categoría:</label>
                            <div class="field has-addons">
                                <div class="control is-expanded">
                                    <div class="select is-fullwidth">
                                        <select name="country">
                                            <option value="Argentina">Juice</option>
                                            <option value="Bolivia">Smoothies</option>
                                            <option value="Brazil">Strongthies</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control">
                                    <button type="submit" class="button is-primary">Seleccionar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='columns'>
                        <div className="column">
                            <div className='card'>
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Nueva Categoría
                                    </p>
                                    <a href="#" class="card-header-icon" aria-label="more options">
                                        <span class="icon">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div class="card-content">
                                    <div class="content">



                                        <div class="field has-addons">
                                            <div class="control is-expanded">
                                                <input class="input " type="text" placeholder="Nombre Categoría" />
                                            </div>
                                            <div class="control">
                                                <a class="button is-success">
                                                    Crear Categoría
                        </a>
                                            </div>
                                        </div>

                                        <br />

                                        <table>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Acciones</th>
                                            </tr>
                                            <tr>
                                                <td>Juice</td>
                                                <td><button class="button is-success is-outlined is-small">Eliminar</button></td>
                                            </tr>
                                            <tr>
                                                <td>Smoothies</td>
                                                <td><button class="button is-success is-outlined is-small">Eliminar</button></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className='card'>
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Nuevo Producto
                </p>
                                    <a href="#" class="card-header-icon" aria-label="more options">
                                        <span class="icon">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="field">
                                            <label class="label">Nombre</label>
                                            <div class="control">
                                                <input class="input" type="text" placeholder="Nombre del producto" />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">Categoría</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Seleccione una categoría</option>
                                                        <option>Juice</option>
                                                        <option>Smoothies</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="field">
                                            <label class="label">Descripción</label>
                                            <div class="control">
                                                <textarea class="textarea" placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"></textarea>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">Calorias</label>
                                            <div class="control">
                                                <input class="input" type="number" placeholder="Calorias del producto" />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">Costo de Producción</label>
                                            <div class="control  has-icons-left">
                                                <input class="input" type="number" />
                                                <span class="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faDollarSign} />
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">Precio de venta</label>
                                            <div class="control  has-icons-left">
                                                <input class="input" type="number" />
                                                <span class="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faDollarSign} />
                                                </span>
                                            </div>
                                        </div>

                                        <label class="checkbox">
                                            <input type="checkbox" />
                        Disponibilidad del Producto
                    </label>

                                        <br />
                                        <br />
                                        <button class="button is-success is-fullwidth">Crear Producto</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Newsale;