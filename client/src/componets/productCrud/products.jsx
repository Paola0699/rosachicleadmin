import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react'
import firebase from '../../firebaseElements/firebase'
import Swal from 'sweetalert2'
import { Modal } from 'react-responsive-modal'
import memoize from 'memoize-one';
import 'react-responsive-modal/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import CurrencyFormat from 'react-currency-format';

const columns = memoize((deleteProduct, seOrder, modal) => [
    {
        name: 'Producto',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Categoría',
        selector: 'category',
        sortable: true,
        right: true,
    },
    {
        name: 'Costo',
        selector: row => row.cost,
        cell: row => <CurrencyFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={row.cost}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
        />,
        sortable: true,
        right: true,
    },
    {
        name: 'Precio',
        selector: row => row.price,
        cell: row => <CurrencyFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={row.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
        />,
        sortable: true,
        right: true,
    },
    {
        name: 'Acciones',
        cell: row => <div className='is-flex'>
            <button onClick={() => { modal(true); seOrder(row) }} className='button is-success' style={{ marginRight: '2%' }}>Detalles</button>
            <button onClick={() => deleteProduct(row)} className='button is-success is-outlined'>Eliminar</button>
        </div>,
        right: true,
    }
]);

const customStyles = {
    header: {
        style: {
            fontSize: '22px',
            color: 'white',
            backgroundColor: '#e91e63',
            minHeight: '56px',
            paddingLeft: '16px',
            paddingRight: '8px',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#fafafa',
            minHeight: '56px',
            borderBottomWidth: '1.5px',
            borderBottomColor: '#1293e1',
            borderBottomStyle: 'solid',
        },
        denseStyle: {
            minHeight: '32px',
        },
    },
    headCells: {
        style: {
            fontSize: '1rem',
            fontWeight: 700,
            color: '#616161',
            paddingLeft: '16px',
            paddingRight: '16px',
        },
        activeSortStyle: {
            color: '#1293e1',
            '&:focus': {
                outline: 'none',
            },
            '&:hover:not(:focus)': {
                color: '#1293e1',
            },
        },
        inactiveSortStyle: {
            '&:focus': {
                outline: 'none',
                color: '#1293e1',
            },
            '&:hover': {
                color: '#4dbbff',
            },
        },
    },
};

const db = firebase.firestore();

const deleteProduct = async product => {
    console.log(product.id)
    const result = await Swal.fire({
        icon: "warning",
        title: `¿Seguro que quiere eliminar${product.name}?`,
        showDenyButton: true,
        confirmButtonText: `Si, eliminar`,
        denyButtonText: `No`,
    })
    if (result.isConfirmed) {
        db.collection("products").doc(product.id).delete().then(() => {
            Swal.fire('Producto eliminado', '', 'success')
        }).catch(error => {
            Swal.fire(`Ocurrio un error: ${error}`, '', 'error')
        });

    }
}

function Products() {
    const [productsList, setProductsList] = useState([])
    const [filteredProductsList, setFilteredProductsList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [orderDetail, setorderDetail] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        db.collection("products").onSnapshot(doc => {
            let allProducts = doc.docs.map(product => {
                return {
                    id: product.id,
                    ...product.data()
                }
            })
            setProductsList(allProducts);
            setFilteredProductsList(allProducts);
        });
        db.collection("categories").onSnapshot(doc => {
            let allCategories = doc.docs.map(category => {
                return {
                    id: category.id,
                    ...category.data()
                }
            })
            setCategoriesList(allCategories);

        });
    }, [])
    const filterProducts = filterBy => {
        if (filterBy)
            setFilteredProductsList(productsList.filter(product => product.category === filterBy))
        else
            setFilteredProductsList(productsList)
    }
    return (
        <div>
            <Navbar />
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Productos</h1>
                        <h2 className="subtitle">Todos los Productos</h2>
                        <Breadcrum parent='Productos' children='Todos los Productos' />
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className='columns'>
                        <div className='column is-8'></div>
                        <div className='column is-4'>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select onChange={e => filterProducts(e.target.value)} name="country">
                                            <option selected value='' >Todos los productos</option>
                                            {categoriesList.map(cat =>
                                                <option key={cat.id} value={cat.name}> {cat.name} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-primary">Choose</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <DataTable
                        columns={columns(deleteProduct, setorderDetail, setOpen)}
                        data={filteredProductsList}
                        pagination={true}
                        customStyles={customStyles}
                        paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                    />
                </div>
            </section>
            {orderDetail ? <Modal open={open} onClose={() => setOpen(false)} center className="modal">
                <div style={{ padding: '2.8rem' }}>
                    <h1 class="title">Producto: {orderDetail.name}</h1>
                    <h2 class="subtitle">Categoría: {orderDetail.category}</h2>

                    <div className="field">
                        <label className="label">Calorias</label>
                        <div className="control">
                            <input className="input" type="number" placeholder="Calorias del producto" value={orderDetail.cal} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Costo de Producción</label>
                        <div className="control  has-icons-left">
                            <input value={orderDetail.cost} className="input" type="number" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faDollarSign} />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Precio de Venta</label>
                        <div className="control  has-icons-left">
                            <input value={orderDetail.price} className="input" type="number" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faDollarSign} />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Descripción</label>
                        <div className="control">
                            <textarea value={orderDetail.description} className="textarea" placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"></textarea>
                        </div>
                    </div>

                    <label className="checkbox">
                        <input type="checkbox" />
                        Disponibilidad del Producto
                    </label>
                    <br />
                    <br />
                    <button type="submit" value="Submit" className="button is-success is-fullwidth">Editar Producto</button>
                </div>

                <div className="modal-footer">

                </div>
            </Modal> : null
            }
        </div >
    )
}
export default Products;