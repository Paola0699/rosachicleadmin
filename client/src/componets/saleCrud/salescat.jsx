import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';
import CurrencyFormat from 'react-currency-format';


const data = [{ id: 1, name: 'VITA - C', cathegory: 'Juice', description: 'naranja, guayaba, piña, miel, limón, jengibre', year: '1982' }];
const columns = [
    {
        name: 'Producto',
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
        name: 'Cantidad',
        selector: 'year',
        sortable: true,
        right: true,
    },

    {
        name: 'Monto',
        selector: 'year',
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
                                    <input class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-4'>
                            <div class="field">
                                <label class="label">Fecha de Fin</label>
                                <div class="control">
                                    <input class="input" type="date" placeholder="Nombre del producto" />
                                </div>
                            </div>
                        </div>
                        <div className='column is-4'>
                            <div class="field">
                                <label class="label">Categoría</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select>
                                            <option>Seleccione una categoría</option>
                                            <option>Juice</option>
                                            <option>Smoothies</option>
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
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={125} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className='ocultar-div'><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={200} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td><b style={{ fontSize: '1.1rem' }}><CurrencyFormat decimalScale={2} fixedDecimalScale={true} value={100} displayType={'text'} thousandSeparator={true} prefix={'$'} /></b></td>
                            </tr>
                        </table>
                    </div>

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
export default Salescat;