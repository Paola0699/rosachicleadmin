import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import CurrencyFormat from 'react-currency-format';
import { useEffect, useState } from "react";
import firebase from '../../firebaseElements/firebase'

const db = firebase.firestore();
const columns = [
    {
        name: 'Folio',
        selector: 'id',
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
        name: 'Monto',
        selector: 'total',
        sortable: true,
        right: true,
    },

    {
        name: 'Detalles',
        cell: row => <div className='is-flex'><button className='button is-success' style={{ marginRight: '2%' }}>Detalles</button></div>,
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



function Sales() {
    const [startDate, setStartDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [salesResume, setSalesResume] = useState('');
    const [totalCash, setTotalCash] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        getAllData()
        console.log('effect')
    },[startDate,finalDate])

    const getAllData = async () => {
        if (startDate && finalDate) {
            const querySnapshot = await db.collection("orders")
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('date', '<=', toDate(finalDate, 23, 59, 59))
                .get()

            const orders = querySnapshot.docs.map(sale => {
                return {
                    id: sale.id,
                    ...sale.data(),
                    total: totalOrder(sale.data().products)
                }
            })
            setTotalCash(setTotalByPaymethod(orders,'cash'))
            setTotalDebit(setTotalByPaymethod(orders,'debit'))
            setTotalCredit(setTotalByPaymethod(orders,'credit'))
            setSalesResume(orders)
        }
    }
    const setTotalByPaymethod = (orders,paymethod )=>{
        const reducer = (accumulator, order) => accumulator + totalOrder(order.products);
        return orders.filter(order => order.paymethod === paymethod).reduce(reducer, 0);
    }
    const totalOrder = products => {
        const reducer = (accumulator, product) => accumulator + (product.quantity * product.price);
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
                        <h1 class="title">Ventas Generales</h1>
                        <h2 class="subtitle">Consulta las ventas generales</h2>
                        <Breadcrum />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de inicio</label>
                                <div class="control">
                                    <input onChange={e => setStartDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input onChange={e => setFinalDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-container">
                        <table className='table' style={{ marginBottom: '2%', textAlign: 'center', width: '100%' }}>
                            <tr>
                                <th className='ocultar-div'><small>Pagos </small><br />Efectivo</th>
                                <th className='ocultar-div'><small>Pagos </small><br />Tarjeta Crédito</th>
                                <th className='ocultar-div'><small>Pagos </small><br />Tarjeta Débito</th>
                                <th className='is-success'><small>Total </small><br />Ventas</th>
                            </tr>
                            <tr>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalCash} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalCredit} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalDebit} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td><b style={{ fontSize: '1.1rem' }}><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={totalCash+totalCredit+totalDebit} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                            </tr>
                        </table>
                    </div>

                    <DataTable
                        columns={columns}
                        data={salesResume}
                        pagination={true}
                        customStyles={customStyles}
                        paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                    />
                </div>
            </section>
        </div>
    )
}
export default Sales;