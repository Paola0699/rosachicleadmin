import Navbar from "../common/navbar";
import Navbargen from "../common/navbargeneral";
import Breadcrum from "../common/breadcrum";
import { useEffect, useRef, useState } from "react";
import firebase from "../../firebaseElements/firebase";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CurrencyFormat from "react-currency-format";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const db = firebase.firestore();
const quantityButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid #ddd",
  padding: ".5rem .8rem",
  fontWeight: "900",
  borderRadius: "4px 0px 0px 4px",
};
const productQuantityStyle = {
  display: "flex",
  alignItems: "center",
  padding: ".5rem .8rem",
  border: "1px solid rgb(221, 221, 221)",
};

function Newsale() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [payMethod, setPayMethod] = useState("cash");
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
      db.collection("categories").onSnapshot((doc) => {
        let allCategories = doc.docs.map((category) => {
          return {
            id: category.id,
            ...category.data(),
          };
        });
        setCategoriesList(allCategories);
        setFilteredProductsList(
          allProducts.filter(
            (product) => product.category === allCategories[0].name
          )
        );
      });
    });
  }, []);
  const filterProducts = (filterBy) => {
    setFilteredProductsList(
      productsList.filter((product) => product.category === filterBy)
    );
  };
  const getCurrentOrderProducts = (product) => {
    const i = orderProducts
      .map((e) => e.id)
      .findIndex((ele) => ele === product.id);
    let aux = orderProducts.map((e) => e);
    return [i, aux];
  };
  const addProduct = (product) => {
    let [i, aux] = getCurrentOrderProducts(product);
    if (i === -1) aux.push({ quantity: 1, ...product });
    else aux[i].quantity++;
    setOrderProducts(aux);
  };
  const moreProduct = (product) => {
    let [i, aux] = getCurrentOrderProducts(product);
    aux[i].quantity++;
    setOrderProducts(aux);
  };
  const lessProduct = (product) => {
    let [i, aux] = getCurrentOrderProducts(product);
    if (product.quantity === 1) aux.splice(i, 1);
    else aux[i].quantity--;
    setOrderProducts(aux);
  };
  const totalOrder = () => {
    const reducer = (accumulator, product) =>
      accumulator + product.quantity * product.price;
    return orderProducts.reduce(reducer, 0);
  };
  const order = () => {
    if (payMethod === "debit" || payMethod === "credit") {
      console.log("handeled");
      Swal.fire({
        title: "¿Pasó la tarjeta?",
        text: "Confirma el cobro en tu terminal antes de registrar la compra",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#e91e63",
        cancelButtonColor: "#bdbdbd ",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        setOrderOnDB(result);
      });
    } else {
      Swal.fire({
        title: "¿El cobro fue correcto?",
        text: "Confirma el cobro antes de registrar la compra",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#e91e63",
        cancelButtonColor: "#bdbdbd ",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        setOrderOnDB(result);
      });
    }
  };
  const setOrderOnDB = (result) => {
    if (result.value) {
      let order = {
        paymethod: payMethod,
        date: firebase.firestore.Timestamp.now(),
        toprint: true,
        products: orderProducts.map((product) => {
          return {
            name: product.name,
            price: product.price,
            cost: product.cost,
            quantity: product.quantity,
            id: product.id,
            category: product.category,
          };
        }),
      };
      db.collection("orders")
        .add(order)
        .then(() => {
          Swal.fire("¡Ordenado!", "La orden está siendo preparada", "success");
          setOrderProducts([]);
        })
        .catch((error) =>
          Swal.fire("Error!", `Ocurrio un error: ${error}`, "warning")
        );
      setOpen(false);
    }
  };
  return redirect ? (
    <Redirect to="/" />
  ) : (
    <>
      <div>
        {usertype === "admin" ? <Navbar /> : <Navbargen />}
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Nueva Venta</h1>
              <h2 className="subtitle">Generar Venta</h2>
              <Breadcrum parent="Ventas" children="Nueva Venta" />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <label>Seleccione Categoría:</label>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        onChange={(e) => filterProducts(e.target.value)}
                        name="country"
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {" "}
                            {cat.name}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="control">
                                    <button type="submit" className="button is-success">Seleccionar</button>
                                </div> */}
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      Productos de la Categoría
                    </p>
                  </header>
                  <div
                    className="card-content"
                    style={{ overflow: "scroll", height: "20rem" }}
                  >
                    <div className="content">
                      <table className="table is-hoverable">
                        <tr>
                          <th>Producto</th>
                          <th>Descripción</th>
                          <th>Precio</th>
                        </tr>
                        {filteredProductsList.map((product) => (
                          <tr
                            onClick={() => addProduct(product)}
                            key={product.id}
                          >
                            <td>{product.name} </td>
                            <td>{product.description} </td>
                            <td>
                              {" "}
                              <CurrencyFormat
                                decimalScale={2}
                                fixedDecimalScale={true}
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Productos en la Orden</p>
                  </header>
                  <div
                    className="card-content"
                    style={{ overflow: "scroll", height: "20rem" }}
                  >
                    <div className="content">
                      <table className="table is-hoverable">
                        <tr>
                          <th>Producto</th>
                          <th>Descripción</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                          <th>Total</th>
                        </tr>
                        {orderProducts.map((product) => (
                          <tr key={product.id}>
                            <td>{product.name} </td>
                            <td>{product.description} </td>
                            <td>
                              <div style={{ display: "flex" }}>
                                <button
                                  onClick={() => lessProduct(product)}
                                  style={quantityButtonStyle}
                                >
                                  -
                                </button>
                                <div style={productQuantityStyle}>
                                  {" "}
                                  {product.quantity}{" "}
                                </div>
                                <button
                                  onClick={() => moreProduct(product)}
                                  style={quantityButtonStyle}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              <CurrencyFormat
                                decimalScale={2}
                                fixedDecimalScale={true}
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </td>
                            <td>
                              <CurrencyFormat
                                decimalScale={2}
                                fixedDecimalScale={true}
                                value={product.price * product.quantity}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  onClick={() => setOpen(true)}
                  disabled={orderProducts.length > 0 ? false : true}
                  className="button is-success is-fullwidth"
                >
                  CONFIRMAR ORDEN
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div style={{ padding: "2.5rem" }}>
          <div className="modal-header">
            <h1 className="title">Confirmar Orden</h1>
            <h2 className="subtitle">Confirmación de la orden</h2>
          </div>
          <div className="modal-body">
            <br />
            <div className="user-status table-responsive products-table">
              <table className="table table-bordernone mb-0">
                <thead>
                  <tr>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                {orderProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.quantity} </td>
                    <td>{product.name} </td>
                    <td>{product.description} </td>
                    <td>
                      <CurrencyFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td>
                      <CurrencyFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={product.price * product.quantity}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="is-success">Total a pagar</td>
                  <td className="is-success">
                    <CurrencyFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={totalOrder()}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                </tr>
                <tbody></tbody>
              </table>
            </div>
            <div>
              <div
                className="row"
                style={{
                  /* backgroundColor: '#f5f5f5', */ padding: "3%",
                  marginTop: "4%",
                }}
              >
                <div className="col">
                  <b>Método de pago</b>
                </div>
                <div className="columns">
                  <div className="column">
                    <label className="d-block">
                      <input
                        onChange={() => setPayMethod("cash")}
                        className="radio_animated"
                        id="edo-ani3"
                        type="radio"
                        name="rdo-ani2"
                        defaultChecked
                      />
                      Efectivo
                    </label>
                  </div>
                  <div className="column">
                    <label className="d-block">
                      <input
                        onChange={() => setPayMethod("debit")}
                        className="radio_animated"
                        id="edo-ani4"
                        type="radio"
                        name="rdo-ani2"
                      />
                      Tarjeta de debito
                    </label>
                  </div>
                  <div className="column">
                    <label className="d-block">
                      <input
                        onChange={() => setPayMethod("credit")}
                        className="radio_animated"
                        id="edo-ani4"
                        type="radio"
                        name="rdo-ani2"
                      />{" "}
                      Tarjeta de credito
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={order} className="button is-success">
              Ordenar
            </button>
            <button className="button" onClick={() => setOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Newsale;
