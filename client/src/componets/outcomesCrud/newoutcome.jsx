import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from "react";
import firebase from '../../firebaseElements/firebase'
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom"

const db = firebase.firestore();

function Newoutcome() {
    const [kind, setKind] = useState('');
    const [outcomeKind, setOutcomeKind] = useState('Gasto General');
    const [concept, setConcept] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [paymethod, setPaymethod] = useState('');
    const [responsable, setResponsable] = useState('');
    const [authorizer, setAuthorizer] = useState('');
    const [fileName, setFileName] = useState('');
    const [redirect, setRedirect] = useState(false);


    const ticket = useRef(null);
    const kindRef = useRef(null);
    const outcomeKindRef = useRef(null);
    const conceptRef = useRef(null);
    const quantityRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);
    const paymethodRRef = useRef(null);
    const responsableRef = useRef(null);
    const authorizerRef = useRef(null);

    const refs = [ticket,
        kindRef,
        conceptRef,
        quantityRef,
        dateRef,
        descriptionRef,
        paymethodRRef,
        responsableRef,
        authorizerRef
    ]

    const save = async () => {
        console.log('working')
        let storageRef = firebase.storage().ref();
        const ticketImg = storageRef.child(`outcomes/${Date.now()}.webp`);

        await ticketImg.put(ticket.current.files[0])
        const downloadURL = await ticketImg.getDownloadURL()
        const newOutcome = {
            kind: kind,
            concept: concept,
            quantity: Number(quantity),
            date: toDate(date, 12, 0, 0),
            description: description,
            paymethod: paymethod,
            responsable: responsable,
            authorizer: authorizer,
            ticketImg: downloadURL,
            status: 'Pendiente'
        }
        if (outcomeKind)
            newOutcome.outcomeKind = outcomeKind
        db.collection('outcomes').add(newOutcome).then(() => {
            Swal.fire(
                'Registrado!',
                'El movimiento se registro con exito',
                'success'
            )
            refs.forEach(ref => ref.current.value = '')
            //outcomeKindRef.current.value='Gasto General'
            //ticket.current.files[0]=''
            setFileName('')
        }).catch(error =>
            Swal.fire(
                'Error!',
                `Ocurrio un error: ${error}`,
                'warning'
            )
        );
        console.log(downloadURL)
        console.log('saved')
    }
    const toDate = (text, h, m, s) => {
        const dataAux = text.split('-')
        const temDate = new Date(Number(dataAux[0]), Number(dataAux[1]) - 1, Number(dataAux[2]), h, m, s)
        return firebase.firestore.Timestamp.fromDate(temDate)
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
        } else {
            setRedirect(true)
            console.log("No estoy loggeado")
        }
    });

    return redirect ? <Redirect to='/' /> :(
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Nuevo Gasto</h1>
                        <h2 class="subtitle">Dar de alta un nuevo gasto o ingreso</h2>
                        <Breadcrum parent='Gastos e Ingresos' children='Nuevo Gasto' />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className="column">
                            <div className='card'>
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Información General
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="field">
                                            <label class="label">*Tipo de Movimiento</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select ref={kindRef} onChange={e => setKind(e.target.value)} >
                                                        <option selected disabled>Movimiento</option>
                                                        <option>Gasto</option>
                                                        <option>Ingreso</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {kind === 'Gasto' ? <div class="field">
                                            <label class="label">*Tipo de Gasto</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select ref={outcomeKindRef} defaultChecked={'Gasto General'} onChange={e => setOutcomeKind(e.target.value)}>
                                                        <option>Gasto General</option>
                                                        <option>Gasto Operativo</option>
                                                        <option>Gasto Administrativo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> : null}

                                        <div class="field">
                                            <label class="label">*Concepto</label>
                                            <div class="control">
                                                <input ref={conceptRef} onChange={e => setConcept(e.target.value)} class="input" type="text" placeholder="Nombre del producto" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Importe</label>
                                            <div class="control">
                                                <input ref={quantityRef} onChange={e => setQuantity(e.target.value)} class="input" type="number" placeholder="Nombre del producto" min="0" step="0.01" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Fecha pago/cobro</label>
                                            <div class="control">
                                                <input ref={dateRef} onChange={e => setDate(e.target.value)} class="input" type="date" placeholder="Nombre del producto" />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Comentario/Descripción</label>
                                            <div class="control">
                                                <textarea ref={descriptionRef} onChange={e => setDescription(e.target.value)} class="textarea" placeholder=""></textarea>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Método de pago/cobro</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select ref={paymethodRRef} onChange={e => setPaymethod(e.target.value)}>
                                                        <option selected disabled>Método</option>
                                                        <option>Efectivo</option>
                                                        <option>Cheque</option>
                                                        <option>Tarjeta de Crédito</option>
                                                        <option>Tarjeta de Débito</option>
                                                        <option>Transferencia Electrónica</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Responsable</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select ref={responsableRef} onChange={e => setResponsable(e.target.value)}>
                                                        <option selected disabled value="">Seleccione</option>
                                                        <option value='juanPerez'>Juan Pérez</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Autoriza</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select ref={authorizerRef} onChange={e => setAuthorizer(e.target.value)}>
                                                        <option selected disabled value="">Seleccione</option>
                                                        <option value='sanjuanero'>Guillermo Sanjuanero</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className='card'>
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Comprobante de Pago/Cobro
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <article class="message is-success">
                                            <div class="message-body">
                                                Requisitos del Comprobante
                                                <br />
                                                Para que tu Cobro/Pago sea válido, deberás anexar una imagen de tu comprobante. Este comprobante deberá ser: <strong>Ticket de compra, Factura, Recibo, Comprobante de Tranferencia Bancaria </strong>.
                                                <br /> Es necesario que el monto del comprobante y la fecha coincidan con los datos ingresados en el sistema, de otro modo, este no será tomado en cuenta.
                                            </div>
                                        </article>

                                        <div class="file has-name is-boxed is-fullwidth">
                                            <label class="file-label">
                                                <input onChange={e => setFileName(e.target.files[0].name)} ref={ticket} class="file-input" type="file" name="resume" />
                                                <span class="file-cta">
                                                    <span class="file-icon">
                                                        <FontAwesomeIcon icon={faUpload} />
                                                    </span>
                                                    <span class="file-label is-center" style={{ textAlign: 'center' }}>
                                                        Seleccione un archivo
                                                    </span>
                                                </span>
                                                <span class="file-name" style={{ textAlign: 'center' }}>
                                                    {fileName}
                                                </span>
                                            </label>
                                        </div>
                                        <br />
                                        <button onClick={save} className='button is-fullwidth is-success'>REGISTRAR</button>
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
export default Newoutcome;