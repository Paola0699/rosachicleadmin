import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import firebase from '../../firebaseElements/firebase'


function ProductCrud() {
  const db = firebase.firestore();
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [cal, setCal] = useState(0)
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [available, setAvailable] = useState(false)

  const handleProductSubmit = async e => {
    e.preventDefault();
    console.log(name, category, description, cal, cost, price, available)
    await db.collection("products").add({
      name: name,
      category: category,
      description: description,
      cal: Number(cal),
      cost: Number(cost),
      price: Number(price),
      available: available
    })
      console.log("Document successfully written!");
  }

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
            <form className="column" onSubmit={handleProductSubmit}>
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
                        <input onChange={e => setName(e.target.value)} className="input" type="text" placeholder="Nombre del producto" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Categoría</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select onChange={e => setCategory(e.target.value)} >
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
                        <textarea onChange={e => setDescription(e.target.value)} className="textarea" placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"></textarea>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Calorias</label>
                      <div className="control">
                        <input onChange={e => setCal(e.target.value)} className="input" type="number" placeholder="Calorias del producto" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Costo de Producción</label>
                      <div className="control  has-icons-left">
                        <input onChange={e => setCost(e.target.value)} className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Precio de venta</label>
                      <div className="control  has-icons-left">
                        <input onChange={e => setPrice(e.target.value)} className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>
                    <label className="checkbox">
                      <input onChange={e => setAvailable(e.target.checked)} type="checkbox" />
                        Disponibilidad del Producto
                    </label>
                    <br />
                    <br />
                    <button type="submit" value="Submit" className="button is-success is-fullwidth">Crear Producto</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProductCrud;