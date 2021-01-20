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
                                    <button type="submit" class="button is-success">Seleccionar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='columns'>
                        <div className="column">
                            <div className='card'>
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Productos de la  Categoría
                                    </p>
                                </header>
                                <div class="card-content" style={{ overflow: 'scroll', height: '20rem' }}>
                                    <div class="content">
                                        <table className="table is-hoverable">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Descripción</th>
                                                <th>Precio</th>
                                            </tr>
                                            <tr>
                                                <td>Vita - C</td>
                                                <td>Naranja, Guayaba, Piña, Miel, Limón, Jengibre.</td>
                                                <td>$40.00</td>
                                            </tr>
                                            <tr>
                                                <td>Verde</td>
                                                <td>Espinaca, Pepino, Nopal, Apio, Perejil, Piña, Jengibre.</td>
                                                <td>$40.00</td>
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
                                        Productos en la Orden
                                    </p>
                                </header>
                                <div class="card-content" style={{ overflow: 'scroll', height: '20rem' }}>
                                    <div class="content">
                                        <table className="table is-hoverable">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Descripción</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Total</th>
                                            </tr>
                                            <tr>
                                                <td>Vita - C</td>
                                                <td>Naranja, Guayaba, Piña, Miel, Limón, Jengibre.</td>
                                                <td><div style={{ display: 'flex' }}>
                                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #ddd', padding: '.5rem .8rem', fontWeight: '900', borderRadius: '4px 0px 0px 4px' }}>-</button>
                                                    <div style={{ display: 'flex', alignItems: 'center', padding: '.5rem .8rem', border: '1px solid rgb(221, 221, 221)' }}> 2 </div>
                                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #ddd', padding: '.5rem .8rem', fontWeight: '900', borderRadius: '0px 4px 4px 0px' }}>+</button>
                                                </div>
                                                </td>
                                                <td>$40.00</td>
                                                <td>$80.00</td>
                                            </tr>
                                            <tr>
                                                <td>Verde</td>
                                                <td>Espinaca, Pepino, Nopal, Apio, Perejil, Piña, Jengibre.</td>
                                                <td><div style={{ display: 'flex' }}>
                                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #ddd', padding: '.5rem .8rem', fontWeight: '900', borderRadius: '4px 0px 0px 4px' }}>-</button>
                                                    <div style={{ display: 'flex', alignItems: 'center', padding: '.5rem .8rem', border: '1px solid rgb(221, 221, 221)' }}> 3 </div>
                                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #ddd', padding: '.5rem .8rem', fontWeight: '900', borderRadius: '0px 4px 4px 0px' }}>+</button>
                                                </div>
                                                </td>
                                                <td>$40.00</td>
                                                <td>$120.00</td>
                                            </tr>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <br/>
                            <button className='button is-success is-fullwidth'>CONFIRMAR ORDEN</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Newsale;