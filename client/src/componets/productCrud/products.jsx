import Navbar from "../common/navbar"
import Breadcrum from "../common/breadcrum"
import DataTable from 'react-data-table-component';

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
    {
        name: 'Producto',
        selector: 'title',
        sortable: true,
    },
    {
        name: 'Categoría',
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