import Navbar from "../common/navbar";
import Navbargen from "../common/navbargeneral";
import Breadcrum from "../common/breadcrum";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import firebase from "../../firebaseElements/firebase";
import memoize from "memoize-one";
import "react-responsive-modal/styles.css";
import CurrencyFormat from "react-currency-format";
import { Redirect } from "react-router-dom";
import ProductDetailsModal from "./ProductDetailsModal";
import { tableCustomStyles } from "../../styles/tableStyles";
import { deleteProduct } from "../../services/productsService";
const db = firebase.firestore();

const columns = memoize((deleteProduct, seOrder, modal) => [
  {
    name: "Producto",
    selector: (row) => row["name"],
    sortable: true,
  },
  {
    name: "Categoría",
    selector: (row) => row["category"],
    sortable: true,
    left: true,
  },
  {
    name: "Costo",
    selector: (row) => row["cost"],
    cell: (row) => (
      <CurrencyFormat
        decimalScale={2}
        fixedDecimalScale={true}
        value={row.cost}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    ),
    sortable: true,
    left: true,
  },
  {
    name: "Precio",
    selector: (row) => row["price"],
    cell: (row) => (
      <CurrencyFormat
        decimalScale={2}
        fixedDecimalScale={true}
        value={row.price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    ),
    sortable: true,
    left: true,
  },
  {
    name: "Acciones",
    cell: (row) => (
      <div className="is-flex">
        <button
          onClick={() => {
            modal(true);
            seOrder(row);
          }}
          className="button is-success"
          style={{ marginRight: "2%" }}
        >
          Detalles
        </button>
        <button
          onClick={() => deleteProduct(row)}
          className="button is-success is-outlined"
        >
          Eliminar
        </button>
      </div>
    ),
    wrap: false,
    left: true,
    width: "15rem",
  },
]);
const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [orderDetail, setorderDetail] = useState();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [usertype, setUser] = useState("");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("accounts")
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.data().type === "admin") {
            setUser("admin");
          } else setUser("user");
        });
    } else {
      setRedirect(true);
      console.log("No estoy loggeado");
    }
  });

  useEffect(() => {
    db.collection("products").onSnapshot((doc) => {
      let allProducts = doc.docs.map((product) => {
        return {
          id: product.id,
          ...product.data(),
        };
      });
      setProductsList(allProducts);
      setFilteredProductsList(allProducts);
    });
    db.collection("categories").onSnapshot((doc) => {
      let allCategories = doc.docs.map((category) => {
        return {
          id: category.id,
          ...category.data(),
        };
      });
      setCategoriesList(allCategories);
    });
  }, []);

  const filterProducts = (filterBy) => {
    if (filterBy !== "default")
      setFilteredProductsList(
        productsList.filter((product) => product.category === filterBy)
      );
    else setFilteredProductsList(productsList);
  };

  const selectProduct = (pro) => {
    setorderDetail(pro);
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      {usertype === "admin" ? <Navbar /> : <Navbargen />}
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Productos</h1>
            <h2 className="subtitle">Todos los Productos</h2>
            <Breadcrum parent="Productos" children="Todos los Productos" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8"></div>
            <div className="column is-4">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select
                      onChange={(e) => filterProducts(e.target.value)}
                      name="country"
                      defaultValue={"default"}
                    >
                      <option value="default">Todos los productos</option>
                      {categoriesList.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {" "}
                          {cat.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DataTable
            columns={columns(deleteProduct, selectProduct, setOpen)}
            data={filteredProductsList}
            pagination={true}
            customStyles={tableCustomStyles}
            paginationComponentOptions={{
              rowsPerPageText: "Filas por pagina:",
              rangeSeparatorText: "de",
            }}
          />
        </div>
      </section>
      {orderDetail && (
        <ProductDetailsModal
          open={open}
          setOpen={setOpen}
          orderDetail={orderDetail}
        />
      )}
    </div>
  );
};
export default Products;
