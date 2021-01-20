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
        name: 'Descripción',
        selector: 'year',
        sortable: true,
        right: true,
    },

    {
        name: 'Calorias',
        selector: 'year',
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
        sortable: true,
        right: true,
    },
];

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
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
            </section>

        </div>
    )
}
export default Products;