import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';

const data = [{ id: 1, name: 'VITA - C', cathegory: 'Juice', description: 'naranja, guayaba, piña, miel, limón, jengibre', year: '1982' }];
const columns = [
    {
        name: 'Producto',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Categoría',
        selector: 'cathegory',
        sortable: true,
        right: true,
    },

    {
        name: 'Costo',
        selector: 'year',
        sortable: true,
        right: true,
    },

    {
        name: 'Precio',
        selector: 'year',
        sortable: true,
        right: true,
    },

    {
        name: 'Acciones',
        selector: 'year',
        cell: row => <div className='is-flex'><button className='button is-success' style={{ marginRight: '2%' }}>Detalles</button><button className='button is-success is-outlined'>Eliminar</button></div>,
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


function Products() {
    return (
        <div>
            <Navbar />
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Productos</h1>
                        <h2 class="subtitle">Todos los Productos</h2>
                        <Breadcrum />
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div className='columns'>
                        <div className='column is-8'></div>
                        <div className='column is-4'>
                            <div class="field has-addons">
                                <div class="control is-expanded">
                                    <div class="select is-fullwidth">
                                        <select name="country">
                                            <option value="Argentina">Juice</option>
                                            <option value="Bolivia">Smoothies</option>
                                            <option value="Brazil">Strongthies</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control">
                                    <button type="submit" class="button is-primary">Choose</button>
                                </div>
                            </div>
                        </div>
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
export default Products;