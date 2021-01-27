import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from "react"
import firebase from '../../firebaseElements/firebase'
import Swal from 'sweetalert2'

function ProductCrud() {

  const db = firebase.firestore();
  //states
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [cal, setCal] = useState(0)
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [available, setAvailable] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [categoriesList, setCategoriesList] = useState([])

  //refs
  const categoryRef = useRef();
  const nameRef = useRef();
  const categorySelectRef = useRef();
  const descriptionRef = useRef();
  const calRef = useRef();
  const costRef = useRef();
  const priceRef = useRef();
  const availableRef = useRef();

  const fields = [
    nameRef,
    categorySelectRef,
    descriptionRef,
    calRef,
    costRef,
    priceRef
  ]

  useEffect(() => {
    db.collection("categories").onSnapshot(doc => {
      let allCategories = doc.docs.map(cat => {
        return {
          id: cat.id,
          ...cat.data()
        }
      })
      setCategoriesList(allCategories);
    });
  }, [])
  const handleProductSubmit = e => {
    e.preventDefault();
    console.log(name, category, description, cal, cost, price, available)
    db.collection("products").add({
      name: name,
      category: category,
      description: description,
      cal: Number(cal),
      cost: Number(cost),
      price: Number(price),
      available: available
    }).then(() => {
      fields.forEach(field => field.current.value = '')
      availableRef.current.checked = false;
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: `Producto agregado con exito!`,
      })
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ocurrio un error: ${error}`,
      })
    })
  }
  const handleCategorySubmit = e => {
    e.preventDefault();
    categoryRef.current.value = '';
    db.collection("categories").add({
      name: newCategory,
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Creada',
        text: `¡Categoria agregada con exito!`,
      })
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ocurrio un error: ${error}`,
      })
    })
  }
  async function deleteCategory(cat) {
    const result = await Swal.fire({
      icon: "warning",
      title: `¿Seguro que quiere eliminar la categoria ${cat.name}?`,
      showDenyButton: true,
      confirmButtonText: `Si, eliminar`,
      denyButtonText: `No`,
    })
    if (result.isConfirmed) {
      db.collection("categories").doc(cat.id).delete().then(() => {
        Swal.fire('Categoria eliminada', '', 'success')
      }).catch(error => {
        Swal.fire(`Ocurrio un error: ${error}`, '', 'error')
      });

    }
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
                    <form onSubmit={handleCategorySubmit}>
                      <div className="field">
                        <label className="label">Nombre Categoría</label>
                        <div className="control">
                          <input ref={categoryRef} onChange={e => setNewCategory(e.target.value)} className="input " type="text" placeholder="Nombre Categoría" />
                        </div>
                      </div>
                      <label class="checkbox">
                        <input type="checkbox" />
                          Proveedor Externo
                      </label>
                      <button type="submit" value='submit' className="button is-success is-fullwidth">
                        Crear Categoría
                      </button>
                    </form>
                    <br />
                    <table>
                      <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                      {categoriesList.map(cat =>
                        <tr key={cat.id}>
                          <td> {cat.name} </td>
                          <td><button onClick={() => deleteCategory(cat)} className="button is-success is-outlined is-small">Eliminar</button></td>
                        </tr>
                      )}
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
                        <input ref={nameRef} onChange={e => setName(e.target.value)} className="input" type="text" placeholder="Nombre del producto" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Categoría</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select ref={categorySelectRef} onChange={e => setCategory(e.target.value)} >
                            <option selected disabled value='' >Seleccione una categoría</option>
                            {categoriesList.map(cat =>
                              <option key={cat.id} value={cat.name}> {cat.name} </option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Descripción</label>
                      <div className="control">
                        <textarea ref={descriptionRef} onChange={e => setDescription(e.target.value)} className="textarea" placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"></textarea>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Calorias</label>
                      <div className="control">
                        <input ref={calRef} onChange={e => setCal(e.target.value)} className="input" type="number" placeholder="Calorias del producto" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Costo de Producción</label>
                      <div className="control  has-icons-left">
                        <input ref={costRef} onChange={e => setCost(e.target.value)} className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Precio de venta</label>
                      <div className="control  has-icons-left">
                        <input ref={priceRef} onChange={e => setPrice(e.target.value)} className="input" type="number" />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                      </div>
                    </div>
                    <label className="checkbox">
                      <input ref={availableRef} onChange={e => setAvailable(e.target.checked)} type="checkbox" />
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