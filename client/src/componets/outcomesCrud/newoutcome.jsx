import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

function Newoutcome() {
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Nuevo Gasto</h1>
                        <h2 class="subtitle">Dar de alta un nuevo gasto o ingreso</h2>
                        <Breadcrum />
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
                                                    <select>
                                                        <option>Movimiento</option>
                                                        <option>Gasto</option>
                                                        <option>Ingreso</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Tipo de Gasto</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Gasto General</option>
                                                        <option>Gasto Operativo</option>
                                                        <option>Gasto Administrativo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Concepto</label>
                                            <div class="control">
                                                <input class="input" type="text" placeholder="Nombre del producto" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Importe</label>
                                            <div class="control">
                                                <input class="input" type="number" placeholder="Nombre del producto" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Fecha pago/cobro</label>
                                            <div class="control">
                                                <input class="input" type="date" placeholder="Nombre del producto" />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Comentario/Descripción</label>
                                            <div class="control">
                                                <textarea class="textarea" placeholder=""></textarea>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label">*Método de pago/cobro</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Método</option>
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
                                                    <select>
                                                        <option>Juan Pérez</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">*Autoriza</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select>
                                                        <option>Guillermo Sanjuanero</option>
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
                                                <br/>
                                                Para que tu Cobro/Pago sea válido, deberás anexar una imagen de tu comprobante. Este comprobante deberá ser: <strong>Ticket de compra, Factura, Recibo, Comprobante de Tranferencia Bancaria </strong>.
                                                <br /> Es necesario que el monto del comprobante y la fecha coincidan con los datos ingresados en el sistema, de otro modo, este no será tomado en cuenta.
                                            </div>
                                        </article>

                                        <div class="file has-name is-boxed is-fullwidth">
                                            <label class="file-label">
                                                <input class="file-input" type="file" name="resume" />
                                                <span class="file-cta">
                                                    <span class="file-icon">
                                                        <FontAwesomeIcon icon={faUpload} />
                                                    </span>
                                                    <span class="file-label is-center" style={{ textAlign: 'center' }}>
                                                        Seleccione un archivo
                                                    </span>
                                                </span>
                                                <span class="file-name" style={{ textAlign: 'center' }}>
                                                    Screen Shot 2017-07-29 at 15.54.25.png
                                                </span>
                                            </label>
                                        </div>
                                        <br/>
                                        <button className='button is-fullwidth is-success'>REGISTRAR</button>
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