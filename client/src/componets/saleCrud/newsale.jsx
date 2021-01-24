import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import firebase from '../../firebaseElements/firebase'
const db = firebase.firestore();
const quantityButtonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '.5rem .8rem',
    fontWeight: '900',
    borderRadius: '4px 0px 0px 4px'
}
const productQuantityStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '.5rem .8rem', 
    border: '1px solid rgb(221, 221, 221)' 
}

function Newsale() {
    const [categoriesList, setCategoriesList] = useState([])
    const [productsList, setProductsList] = useState([])
    const [filteredProductsList, setFilteredProductsList] = useState([])
    const [orderProducts, setOrderProducts] = useState([])

    useEffect(() => {
        db.collection("products").onSnapshot(doc => {
            let allProducts = doc.docs.map(product => {
                return {
                    id: product.id,
                    ...product.data()
                }
            })
            setProductsList(allProducts);
            db.collection("categories").onSnapshot(doc => {
                let allCategories = doc.docs.map(category => {
                    return {
                        id: category.id,
                        ...category.data()
                    }
                })
                setCategoriesList(allCategories);
                setFilteredProductsList(allProducts.filter(product => product.category === allCategories[0].name))
            });
        });
    }, [])
    const filterProducts = filterBy => {
        setFilteredProductsList(productsList.filter(product => product.category === filterBy))
    }
    function getCurrentOrderProducts(product){
        const i = orderProducts.map(e => e.id).findIndex(ele => ele === product.id);
        let aux = orderProducts.map(e=>e) 
        return [i,aux];
    }
    const addProduct = product => {
        let [i,aux] = getCurrentOrderProducts(product)
        if (i === -1)
            aux.push({ quantity: 1, ...product })
        else
            aux[i].quantity++;
        setOrderProducts(aux)
    }
    const moreProduct = product => {
        let [i,aux] = getCurrentOrderProducts(product)
        aux[i].quantity++;
        setOrderProducts(aux)
    }
    const lessProduct = product => {
        let [i,aux] = getCurrentOrderProducts(product)
        if (product.quantity === 1)
            aux.splice(i, 1)
        else
            aux[i].quantity--;
        setOrderProducts(aux)
    }
    return (
        <div>
            <Navbar />
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Nueva Venta</h1>
                        <h2 className="subtitle">Generar Venta</h2>
                        <Breadcrum />
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className='columns'>
                        <div className="column">
                            <label>Seleccione Categoría:</label>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select onChange={e => filterProducts(e.target.value)} name="country">
                                            {categoriesList.map(cat =>
                                                <option key={cat.id} value={cat.name}> {cat.name} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="control">
                                    <button type="submit" className="button is-success">Seleccionar</button>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className='columns'>
                        <div className="column">
                            <div className='card'>
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Productos de la  Categoría
                                    </p>
                                </header>
                                <div className="card-content" style={{ overflow: 'scroll', height: '20rem' }}>
                                    <div className="content">
                                        <table className="table is-hoverable">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Descripción</th>
                                                <th>Precio</th>
                                            </tr>
                                            {filteredProductsList.map(product =>
                                                <tr onClick={() => addProduct(product)} key={product.id}>
                                                    <td>{product.name} </td>
                                                    <td>{product.description} </td>
                                                    <td> {product.price} </td>
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className='card'>
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Productos en la Orden
                                    </p>
                                </header>
                                <div className="card-content" style={{ overflow: 'scroll', height: '20rem' }}>
                                    <div className="content">
                                        <table className="table is-hoverable">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Descripción</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Total</th>
                                            </tr>
                                            {orderProducts.map(product =>
                                                <tr key={product.id}>
                                                    <td>{product.name} </td>
                                                    <td>{product.description} </td>
                                                    <td><div style={{ display: 'flex' }}>
                                                        <button onClick={() => lessProduct(product)} style={quantityButtonStyle}>-</button>
                                                        <div style={productQuantityStyle}> {product.quantity} </div>
                                                        <button onClick={() => moreProduct(product)} style={quantityButtonStyle}>+</button>
                                                    </div>
                                                    </td>
                                                    <td>{product.price} </td>
                                                    <td>{product.price*product.quantity}</td>
                                                </tr>)}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button disabled={orderProducts.length>0 ? false : true} className='button is-success is-fullwidth'>CONFIRMAR ORDEN</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Newsale;