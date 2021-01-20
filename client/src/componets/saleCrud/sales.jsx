import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import CurrencyFormat from 'react-currency-format';


const data = [{ id: 1, name: 'VITA - C', cathegory: 'Juice', description: 'naranja, guayaba, piña, miel, limón, jengibre', year: '1982' }];
const columns = [
    {
        name: 'Folio',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Fecha',
        selector: 'cathegory',
        sortable: true,
        right: true,
    },

    {
        name: 'Monto',
        selector: 'year',
        sortable: true,
        right: true,
    },

    {
        name: 'Detalles',
        selector: 'year',
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

                    <section class="section">
                        <div class="container">
                            <table className='table' style={{ marginBottom: '2%', textAlign: 'center' }}>
                                <tr>
                                    <th className='ocultar-div'><small>Pagos </small><br />Efectivo</th>
                                    <th className='ocultar-div'><small>Pagos </small><br />Tarjeta Crédito</th>
                                    <th className='ocultar-div'><small>Pagos </small><br />Tarjeta Débito</th>
                                    <th style={{ backgroundColor: '#f06292' }}><small>Total </small><br />Ventas</th>
                                </tr>
                                <tr>
                                    <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={125} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={200} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={100} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    <td style={{ backgroundColor: '#f06292' }}><b style={{ fontSize: '1.1rem' }}><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={100} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                                </tr>
                            </table>
                        </div>
                    </section>
                    <DataTable
                        columns={columns}
                        data={data}
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