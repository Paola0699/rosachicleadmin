import Navbar from "./common/navbar"
import Breadcrum from "./common/breadcrum"
import CurrencyFormat from 'react-currency-format';


function Balance() {
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Balance General </h1>
                        <h2 class="subtitle">Consulta la relación entre gastos e ingresos.</h2>
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
                                    <input class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-6'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='table-container'>
                        <table className='table' style={{ marginBottom: '2%', width: '100%' }}>
                            <tbody >
                                <tr style={{ textAlign: 'center' }}>
                                    <th colSpan='2'className='is-success'>GASTOS</th>
                                    <th colSpan='2' className='is-info'>INGRESOS</th>
                                </tr>
                                <tr>
                                    <th>Concepto</th>
                                    <th style={{ borderRight: '1px solid #dee2e6' }}>Monto</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                </tr>
                                <tr>
                                    <td>Gastos en General</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={200}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    <td >Ventas en General</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={250}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>


                                </tr>
                                <tr>
                                    <td>Gastos Operativos</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={150}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    <td >Proteínas NA</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={120}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                </tr>
                                <tr>
                                    <td>Gastos Administrativos</td>
                                    <td style={{ borderRight: '1px solid #dee2e6' }}>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={100}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>

                                    <td >Polka Donuts</td>
                                    <td >
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={250}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </td>


                                </tr>

                                <tr style={{ fontWeight: '900', backgroundColor: '#e0e0e0' }}>
                                    <td >TOTAL GASTOS</td>
                                    <td> <CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={250} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td >TOTAL INGRESOS</td>
                                    <td ><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={120} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>

                                <tr style={{ textAlign: 'center', backgroundColor: 'rgba(159, 214, 248, 0.1)' }}>
                                    <th colSpan='2'>Utilidad Neta (Ingresos - Gastos)</th>
                                    <th colSpan='2'>
                                        <CurrencyFormat
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            value={120}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}
                                        />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Balance;