import Navbar from "../common/navbar"
import Navbargen from "../common/navbargeneral"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import firebase from '../../firebaseElements/firebase'
import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal'
import memoize from 'memoize-one';
import 'react-responsive-modal/styles.css';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2'
import './outcome.scss'
import { Redirect } from "react-router-dom"

const db = firebase.firestore();
const data = [{ id: 1, name: 'VITA - C', cathegory: 'Juice', description: 'naranja, guayaba, piña, miel, limón, jengibre', year: '1982' }];
const columns = memoize((modal, outcome) => [
    {
        name: 'Concepto',
        selector: 'concept',
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
        left: true,
    },

    {
        name: 'Importe',
        selector: row => row.quantity,
        cell: row => <CurrencyFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={row.quantity}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
        />,
        left: true,
    },

    {
        name: 'Status',
        cell: row => <div>{row.status === "No autorizado" ? <h1 style={{ color: 'red', fontWeight: '700' }}>No Autorizado</h1> : row.status === "Pendiente" ? <h1 style={{ color: 'orange', fontWeight: '700' }}>Pendiente</h1> : <h1 style={{ color: 'green', fontWeight: '700' }}>Autorizado</h1>}</div>,
        sortable: true,
        left: true,
    },
    {
        name: 'Detalles',
        selector: 'year',
        cell: row => <button onClick={() => { modal(true); outcome(row) }} className='button is-success' style={{ marginRight: '2%' }}>Detalles</button>,
        left: true,
    },

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


function Outcomes() {

    const [outcome, setOutcome] = useState();
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [kind, setKind] = useState('');
    const [outcomes, setOutcomes] = useState([]);
    const [userType, setUserType] = useState("")
    const [newSatate, setNewState] = useState()
    const [defaultDate, setDefaultDate] = useState();
    const [redirect, setRedirect] = useState(false);
    const [usertype, setUser] = useState('')
    const [name, setName] = useState('')

    async function getUserType(user, setUserType) {
        const userType = await db.collection("accounts").doc(user.uid).get()
        if (userType.exists)
            if (userType.data().type === 'admin') {
                setUserType('admin')
                setName(userType.data().name)
            } else {
                setUserType('user')
                console.log('user')
            }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                getUserType(user, setUserType)
                console.log(`Hay un user ${user.email}`)
            }
            else
                console.log('no user')
        });

        const today = new Date()
        let month = today.getMonth() + 1 <= 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
        let day = today.getDate() <= 9 ? `0${today.getDate()}` : today.getDate()
        let customDate = `${today.getFullYear()}-${month}-${day}`


        console.log(customDate)
        setDefaultDate(customDate)
        setStartDate(customDate)
        setFinalDate(customDate)


    }, []);

    useEffect(() => {
        getAllData()
        console.log('effect')
    }, [startDate, finalDate, kind])

    const toDate = (text, h, m, s) => {
        const dataAux = text.split('-')
        const temDate = new Date(Number(dataAux[0]), Number(dataAux[1]) - 1, Number(dataAux[2]), h, m, s)
        return firebase.firestore.Timestamp.fromDate(temDate)
    }

    const getAllData = async () => {
        if (startDate && finalDate && kind && name) {

            console.log('get data')
            console.log(name)
            const querySnapshot = await db.collection("outcomes")
                .where('kind', '==', kind)
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('authorizer', '==', name)
                .where('status', '==', 'Pendiente')
                .where('date', '<=', toDate(finalDate, 23, 59, 59)).onSnapshot(querySnapshot => {
                    const temOutcomes = querySnapshot.docs.map(sale => {
                        return {
                            id: sale.id,
                            ...sale.data()
                        }
                    })
                    setOutcomes(temOutcomes)
                })
        }

        else if (startDate && finalDate && kind) {
            const querySnapshot = await db.collection("outcomes")
                .where('kind', '==', kind)
                .where('date', '>', toDate(startDate, 0, 0, 0))
                .where('date', '<=', toDate(finalDate, 23, 59, 59)).onSnapshot(querySnapshot => {
                    const temOutcomes = querySnapshot.docs.map(sale => {
                        return {
                            id: sale.id,
                            ...sale.data()
                        }
                    })
                    setOutcomes(temOutcomes)
                })
        }
    }

    const changeStatus = () => {
        db.collection('outcomes').doc(outcome.id).update({
            status: newSatate
        }).then(() => {
            Swal.fire(
                'Actualizado!',
                'El status se actulizo con exito',
                'success'
            )
        }).catch(error =>
            Swal.fire(
                'Error!',
                `Ocurrio un error: ${error}`,
                'warning'
            )
        );
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("accounts").doc(user.uid).onSnapshot((doc) => {
                if (doc.data().type === 'admin') {
                    setUser("admin")
                }
                else setUser("user")
            })
        } else {
            setRedirect(true)
            console.log("No estoy loggeado")
        }
    });
    return redirect ? <Redirect to='/' /> : (
        <div>
            {usertype === "admin" ? <Navbar /> : <Navbargen />}
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Gastos e Ingresos</h1>
                        <h2 class="subtitle">Consulta los gastos e ingresos del periodo</h2>
                        <Breadcrum parent='Gastos e Ingresos' children='Consultar Gastos e Ingresos' />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className='column'>
                            <div class="field">
                                <label class="label">Gastos / Ingresos</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select onChange={e => setKind(e.target.value)}  >
                                            <option selected disabled>Seleccione concepto</option>
                                            <option value='Gasto'>Gastos</option>
                                            <option value='Ingreso'>Ingresos</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='columns'>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de inicio</label>
                                <div class="control">
                                    <input defaultValue={defaultDate} onChange={e => setStartDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input defaultValue={defaultDate} onChange={e => setFinalDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        columns={columns(setOpen, setOutcome)}
                        data={outcomes}
                        pagination={true}
                        customStyles={customStyles}
                        paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de' }}
                    />
                </div>
            </section>
            {outcome ? <Modal open={open} onClose={() => setOpen(false)} center >
                <div style={{ padding: '2.8rem' }}>
                    <h2 class="subtitle"> {outcome.id}</h2>
                    <h1 class="title"><small>Concepto:</small> {outcome.concept}</h1>
                    <br />
                    <h3 class="subtitle is-size-6"> <b>Descripción: </b> {outcome.description}</h3>
                    <h3 class="subtitle is-size-6"> <b>Fecha: </b> {outcome.date.toDate().toLocaleString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</h3>
                    <h3 class="subtitle is-size-6"> <b>Importe: </b><CurrencyFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={outcome.quantity}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                    /></h3>
                    <h3 class="subtitle is-size-6"> <b>Método de pago/cobro: </b> {outcome.paymethod}</h3>
                    <h3 class="subtitle is-size-6"> <b>Responsable: </b> {outcome.responsable}</h3>
                    <h3 class="subtitle is-size-6"> <b>Autoriza: </b> {outcome.authorizer}</h3>
                    {userType === 'admin' ? (<>

                        <div class="field">
                            <label class="label">Status Gasto: </label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select className='select ' defaultValue={outcome.status} onChange={e => setNewState(e.target.value)} >
                                        <option>No autorizado</option>
                                        <option>Autorizado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className='button is-success is-fullwidth' onClick={changeStatus} >Cambiar status</button>
                        <br />
                        <br />
                    </>) :
                        <h3 class="subtitle is-size-6"> <b>Status: </b> {outcome.status}</h3>
                    }
                    <img style={{ width: '25rem' }} src={outcome.ticketImg} alt="ticketImg" />x
                    <div className="modal-footer">

                    </div>
                </div>
            </Modal> : null}
        </div>
    )
}
export default Outcomes;