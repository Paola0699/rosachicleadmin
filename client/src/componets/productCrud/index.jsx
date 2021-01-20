import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

function ProductCrud() {
  return (
    <div>
      <Navbar />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Nuevo Producto</h1>
            <h2 className="subtitle">Alta de Productos</h2>
            <Breadcrum />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className='columns'>
            <div className="column">
              <div className='card'>
                <header className="card-header">
                  <p className="card-header-title">
                    Nueva Categoría
                </p>
                  <a href="#" className="card-header-icon" aria-label="more options">
                    <span className="icon">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div className="card-content">
                  <div className="content">



                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input className="input " type="text" placeholder="Nombre Categoría" />

                      </div>
                      <div className="control">
                        <a className="button is-success">
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
                        <td><button className="button is-success is-outlined is-small">Eliminar</button></td>
                      </tr>
                      <tr>
                        <td>Smoothies</td>
                        <td><button className="button is-success is-outlined is-small">Eliminar</button></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className='card'>
                <header className="card-header">
                  <p className="card-header-title">
                    Nuevo Producto
                </p>
                  <a href="#" className="card-header-icon" aria-label="more options">
                    <span className="icon">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div className="card-content">
                  <div className="content">
                    <div className="field">
                      <label className="label">Nombre</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="Nombre del producto" />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Categoría</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select>
                            <option>Seleccione una categoría</option>
                            <option>Juice</option>
                            <option>Smoothies</option>
                          </select>
                        </div>
                      </div>
                    </div>


                    <div className="field">
                      <label className="label">Descripción</label>
                      <div className="control">
                        <textarea className="textarea" placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"></textarea>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Calorias</label>
                      <div className="control">
                        <input className="input" type="number" placeholder="Calorias del producto" />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Costo de Producción</label>
                      <div className="control  has-icons-left">
                        <input className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Precio de venta</label>
                      <div className="control  has-icons-left">
                        <input className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>

                    <label className="checkbox">
                      <input type="checkbox" />
                        Disponibilidad del Producto
                    </label>

                    <br />
                    <br />
                    <button className="button is-success is-fullwidth">Crear Producto</button>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProductCrud;