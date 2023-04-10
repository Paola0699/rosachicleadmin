import Navbar from "../common/navbar";
import Breadcrum from "../common/breadcrum";
import DataTable from "react-data-table-component";
import CurrencyFormat from "react-currency-format";
import { useEffect, useState } from "react";
import firebase from "../../firebaseElements/firebase";
import { Redirect } from "react-router-dom";
import { HeroTitle } from "../common/herotitle";
import { tableCustomStyles } from "../../styles/tableStyles";

const db = firebase.firestore();

const columns = [
  {
    name: "Producto",
    selector: "name",
    sortable: true,
  },
  {
    name: "Fecha",
    cell: (row) =>
      row.date.toDate().toLocaleString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    sortable: true,
    right: true,
  },
  {
    name: "Cantidad",
    selector: "quantity",
    sortable: true,
    right: true,
  },

  {
    name: "Precio Unitario",
    selector: (row) => row.price,
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
    right: true,
  },

  {
    name: "Monto Total",
    selector: (row) => row.price * row.quantity,
    cell: (row) => (
      <CurrencyFormat
        decimalScale={2}
        fixedDecimalScale={true}
        value={row.price * row.quantity}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    ),
    sortable: true,
    right: true,
  },
];

function Salescat() {
  const [startDate, setStartDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
    } else {
      setRedirect(true);
      console.log("No estoy loggeado");
    }
  });

  useEffect(() => {
    getAllData();
    console.log("effect");
  }, [startDate, finalDate, category]);

  useEffect(() => {
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
  const getAllData = async () => {
    if (startDate && finalDate) {
      const querySnapshot = await db
        .collection("orders")
        .where("date", ">", toDate(startDate, 0, 0, 0))
        .where("date", "<=", toDate(finalDate, 23, 59, 59))
        .get();

      const allProducts = [];
      querySnapshot.docs.forEach((sale) => {
        sale.data().products.forEach((product) => {
          if (product.category === category) {
            allProducts.push({
              ...product,
              date: sale.data().date,
            });
          }
        });
      });
      setTotalCost(totalOrder(allProducts, "cost"));
      setTotalPrice(totalOrder(allProducts, "price"));
      setAllProducts(allProducts);
    }
  };
  const totalOrder = (products, concept) => {
    const reducer = (accumulator, product) =>
      accumulator + product.quantity * product[concept];
    return products.reduce(reducer, 0);
  };
  const toDate = (text, h, m, s) => {
    const dataAux = text.split("-");
    const temDate = new Date(
      Number(dataAux[0]),
      Number(dataAux[1]) - 1,
      Number(dataAux[2]),
      h,
      m,
      s
    );
    return firebase.firestore.Timestamp.fromDate(temDate);
  };
  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Navbar />
      <HeroTitle
        title={"Ventas por Categoría"}
        subtitle={"Consulta las ventas por categoría"}
        parent={"Ventas"}
        children={"Ventas por Categoría"}
      />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="field">
                <label className="label">Fecha de inicio</label>
                <div className="control">
                  <input
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input"
                    type="date"
                    placeholder="Nombre del producto"
                  />
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="field">
                <label className="label">Fecha de Fin</label>
                <div className="control">
                  <input
                    onChange={(e) => setFinalDate(e.target.value)}
                    className="input"
                    type="date"
                    placeholder="Nombre del producto"
                  />
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="field">
                <label className="label">Categoría</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option selected disabled>
                        Seleccione una categoría
                      </option>
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

          <div className="table-container">
            <table
              className="table"
              style={{ marginBottom: "2%", textAlign: "center", width: "100%" }}
            >
              <tr>
                <th className="ocultar-div">
                  <small>Costos de </small>
                  <br />
                  Producción
                </th>
                <th className="ocultar-div">
                  <small>Precio</small>
                  <br />
                  Venta
                </th>
                <th className="is-success">
                  <small>Ganancias </small>
                  <br />
                  Netas
                </th>
              </tr>
              <tr>
                <td className="ocultar-div">
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={totalCost}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
                <td className="ocultar-div">
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
                <td>
                  <b style={{ fontSize: "1.1rem" }}>
                    <CurrencyFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={totalPrice - totalCost}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </b>
                </td>
              </tr>
            </table>
          </div>

          <DataTable
            columns={columns}
            data={allProducts}
            pagination={true}
            customStyles={tableCustomStyles}
            paginationComponentOptions={{
              rowsPerPageText: "Filas por pagina:",
              rangeSeparatorText: "de",
            }}
          />
        </div>
      </section>
    </div>
  );
}
export default Salescat;
