import Navbar from "../common/navbar";
import Navbargen from "../common/navbargeneral";
import DataTable from "react-data-table-component";
import CurrencyFormat from "react-currency-format";
import { useEffect, useState } from "react";
import firebase from "../../firebaseElements/firebase";
import { Modal } from "react-responsive-modal";
import memoize from "memoize-one";
import "react-responsive-modal/styles.css";
import { Redirect } from "react-router-dom";
import { HeroTitle } from "../common/herotitle";
import { tableCustomStyles } from "../../styles/tableStyles";

const db = firebase.firestore();
const columns = memoize((details, setDetails) => [
  {
    name: "Folio",
    selector: "id",
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
    name: "Monto",
    selector: (row) => row.total,
    cell: (row) => (
      <CurrencyFormat
        decimalScale={2}
        fixedDecimalScale={true}
        value={row.total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    ),
    sortable: true,
    right: true,
  },

  {
    name: "Detalles",
    cell: (row) => (
      <div className="is-flex">
        <button
          onClick={() => {
            details(true);
            setDetails(row);
          }}
          className="button is-success"
          style={{ marginRight: "2%" }}
        >
          Detalles
        </button>
      </div>
    ),
    right: true,
  },
]);

function Sales() {
  const [startDate, setStartDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [salesResume, setSalesResume] = useState("");
  const [totalCash, setTotalCash] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderDetail, setorderDetail] = useState();
  const [defaultDate, setDefaultDate] = useState();
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
    getAllData();
    console.log("effect");
  }, [startDate, finalDate]);
  useEffect(() => {
    const today = new Date();
    let month =
      today.getMonth() + 1 <= 9
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    let day = today.getDate() <= 9 ? `0${today.getDate()}` : today.getDate();
    let customDate = `${today.getFullYear()}-${month}-${day}`;

    console.log(customDate);
    setDefaultDate(customDate);
    setStartDate(customDate);
    setFinalDate(customDate);
  }, []);
  const getAllData = async () => {
    if (startDate && finalDate) {
      const querySnapshot = await db
        .collection("orders")
        .where("date", ">", toDate(startDate, 0, 0, 0))
        .where("date", "<=", toDate(finalDate, 23, 59, 59))
        .get();

      const orders = querySnapshot.docs.map((sale) => {
        return {
          id: sale.id,
          ...sale.data(),
          total: totalOrder(sale.data().products),
        };
      });
      setTotalCash(setTotalByPaymethod(orders, "cash"));
      setTotalDebit(setTotalByPaymethod(orders, "debit"));
      setTotalCredit(setTotalByPaymethod(orders, "credit"));
      setSalesResume(orders);
    }
  };
  const setTotalByPaymethod = (orders, paymethod) => {
    const reducer = (accumulator, order) =>
      accumulator + totalOrder(order.products);
    return orders
      .filter((order) => order.paymethod === paymethod)
      .reduce(reducer, 0);
  };
  const totalOrder = (products) => {
    const reducer = (accumulator, product) =>
      accumulator + product.quantity * product.price;
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
      {usertype === "admin" ? <Navbar /> : <Navbargen />}
      <HeroTitle
        title={"Ventas Generales"}
        subtitle={"Consulta las ventas generales"}
        parent={"Ventas"}
        children={"Ventas Generales"}
      />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Fecha de inicio</label>
                <div className="control">
                  <input
                    defaultValue={defaultDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input"
                    type="date"
                    placeholder="Nombre del producto"
                  />
                </div>
              </div>
            </div>
            <div className="column is-6">
              <div className="field">
                <label className="label">Fecha de Fin</label>
                <div className="control">
                  <input
                    defaultValue={defaultDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                    className="input"
                    type="date"
                    placeholder="Nombre del producto"
                  />
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
                  <small>Pagos </small>
                  <br />
                  Efectivo
                </th>
                <th className="ocultar-div">
                  <small>Pagos </small>
                  <br />
                  Tarjeta Crédito
                </th>
                <th className="ocultar-div">
                  <small>Pagos </small>
                  <br />
                  Tarjeta Débito
                </th>
                <th className="is-success">
                  <small>Total </small>
                  <br />
                  Ventas
                </th>
              </tr>
              <tr>
                <td className="ocultar-div">
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={totalCash}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
                <td className="ocultar-div">
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={totalCredit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
                <td className="ocultar-div">
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={totalDebit}
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
                      value={totalCash + totalCredit + totalDebit}
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
            columns={columns(setOpen, setorderDetail)}
            data={salesResume}
            pagination={true}
            customStyles={tableCustomStyles}
            paginationComponentOptions={{
              rowsPerPageText: "Filas por pagina:",
              rangeSeparatorText: "de",
            }}
          />
        </div>
      </section>
      {orderDetail ? (
        <Modal open={open} onClose={() => setOpen(false)} center>
          <div style={{ padding: "3rem" }}>
            <div className="container">
              <h1 className="title">{orderDetail.id}</h1>
              <h2 className="subtitle">
                {orderDetail.date.toDate().toLocaleString("es-MX", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>
            <div className="modal-body">
              <br />
              <br />
              <div className="table-container">
                <table className="table is-fullwidth">
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                  {orderDetail.products.map((product) => (
                    <tr>
                      <td>{product.name} </td>
                      <td>{product.quantity}</td>
                      <td>
                        <CurrencyFormat
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />{" "}
                      </td>
                      <td>
                        <CurrencyFormat
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={product.price * product.quantity}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />{" "}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="is-success">TOTAL</td>
                    <td className="is-success">
                      <b>
                        <CurrencyFormat
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={orderDetail.total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </b>{" "}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
export default Sales;
