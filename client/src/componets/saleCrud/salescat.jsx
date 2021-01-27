import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import CurrencyFormat from 'react-currency-format';
import { useEffect, useState } from "react";
import firebase from '../../firebaseElements/firebase'


const db = firebase.firestore();


const columns = [
    {
        name: 'Producto',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Fecha',
        cell: row => row.date.toDate().toLocaleString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        sortable: true,
        right: true,
    },
    {
        name: 'Cantidad',
        selector: 'quantity',
        sortable: true,
        right: true,
    },

    {
        name: 'Precio Unitario',
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
        name: 'Monto Total',
        selector: row => row.price *row.quantity,
        cell: row => <CurrencyFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={row.price *row.quantity}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
        />,
        sortable: true,
        right: true,
    },
    
];

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

function Salescat() {
    const [startDate, setStartDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        getAllData()
        console.log('effect')
    },[startDate,finalDate,category])
    
    useEffect(() => {
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
    const getAllData = async () => {
        if (startDate && finalDate) {
            const querySnapshot = await db.collection("orders")
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('date', '<=', toDate(finalDate, 23, 59, 59))
                .get()

            const allProducts = []
            querySnapshot.docs.forEach(sale => {
                sale.data().products.forEach(product=>{
                    if(product.category===category){
                        allProducts.push({
                            ...product,
                            date: sale.data().date
                        })
                    }
                }) 
            })
            setTotalCost(totalOrder(allProducts,'cost'))
            setTotalPrice(totalOrder(allProducts,'price'))
            setAllProducts(allProducts)
        }
    }
    const totalOrder = (products,concept) => {
        const reducer = (accumulator, product) => accumulator + (product.quantity * product[concept]);
        return products.reduce(reducer, 0)
    }
    const toDate = (text, h, m, s) => {
        const dataAux = text.split('-')
        const temDate = new Date(Number(dataAux[0]), Number(dataAux[1]) - 1, Number(dataAux[2]), h, m, s)
        return firebase.firestore.Timestamp.fromDate(temDate)
    }
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Ventas por Categoría</h1>
                        <h2 class="subtitle">Consulta las ventas por categoría</h2>
                        <Breadcrum />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className='column is-4'>
                            <div class="field">
                                <label class="label">Fecha de inicio</label>
                                <div class="control">
                                    <input onChange={e => setStartDate(e.target.value)}  class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-4'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input onChange={e => setFinalDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-4'>
                            <div class="field">
                                <label class="label">Categoría</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select onChange={e => setCategory(e.target.value)}>
                                            <option selected disabled>Seleccione una categoría</option>
                                            {categoriesList.map(cat =>
                                                <option key={cat.id} value={cat.name}> {cat.name} </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-container">
                        <table className='table' style={{ marginBottom: '2%', textAlign: 'center', width: '100%' }}>
                            <tr>
                                <th className='ocultar-div'><small>Costos de </small><br />Producción</th>
                                <th className='ocultar-div'><small>Precio</small><br />Venta</th>
                                <th className='is-success'><small>Ganancias </small><br />Netas</th>
                            </tr>
                            <tr>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalCost} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td><b style={{ fontSize: '1.1rem' }}><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalPrice-totalCost} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                            </tr>
                        </table>
                    </div>

                    <DataTable
                        columns={columns}
                        data={allProducts}
                        pagination={true}
                        customStyles={customStyles}
                        paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                    />
                </div>
            </section>
          
        </div>
    )
}
export default Salescat;