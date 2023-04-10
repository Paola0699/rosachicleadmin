import Navbar from "../common/navbar";
import Navbargen from "../common/navbargeneral";
import Breadcrum from "../common/breadcrum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import firebase from "../../firebaseElements/firebase";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { outcomeValidationSchema } from "../../validationSchema/outcomeValidationSchema";
import { postNewOutcome } from "../../services/outcomesService";
import { HeroTitle } from "../common/herotitle";

const db = firebase.firestore();

const Newoutcome = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      KIND: "default",
      OUTCOME_KIND: "Gasto General",
      CONCEPT: "",
      QUANTITY: 0,
      DATE: "",
      DESCRIPTION: "",
      PAYMENT_METHOD: "default",
    },
    validationSchema: outcomeValidationSchema,
    onSubmit: async (values) => {
      postNewOutcome(values, ticket);
      formik.resetForm();
    },
  });

  const [fileName, setFileName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [usertype, setUser] = useState("");

  const ticket = useRef(null);

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

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      {usertype === "admin" ? <Navbar /> : <Navbargen />}
      <HeroTitle
        title={"Nuevo Gasto"}
        subtitle={"Dar de alta un nuevo gasto o ingreso"}
        parent={"Gastos e Ingresos"}
        children={"Nuevo Gasto"}
      />
      <section className="section">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="columns">
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Información General</p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <div className="field">
                        <label className="label">*Tipo de Movimiento</label>
                        <div className="control">
                          <div
                            className={
                              formik.touched.KIND && Boolean(formik.errors.KIND)
                                ? "select is-fullwidth is-danger"
                                : "select is-fullwidth"
                            }
                          >
                            <select
                              id="KIND"
                              name="KIND"
                              value={formik.values.KIND}
                              onChange={formik.handleChange}
                            >
                              <option disabled value={"default"}>
                                Movimiento
                              </option>
                              <option value={"Gasto"}>Gasto</option>
                              <option value={"Ingreso"}>Ingreso</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {formik.values.KIND === "Gasto" ? (
                        <div className="field">
                          <label className="label">*Tipo de Gasto</label>
                          <div className="control">
                            <div
                              className={
                                formik.touched.OUTCOME_KIND &&
                                Boolean(formik.errors.OUTCOME_KIND)
                                  ? "select is-fullwidth is-danger"
                                  : "select is-fullwidth"
                              }
                            >
                              <select
                                id="OUTCOME_KIND"
                                name="OUTCOME_KIND"
                                value={formik.values.OUTCOME_KIND}
                                onChange={formik.handleChange}
                              >
                                <option value={"Gasto General"}>
                                  Gasto General
                                </option>
                                <option value={"Gasto Operativo"}>
                                  Gasto Operativo
                                </option>
                                <option value={"Gasto Administrativo"}>
                                  Gasto Administrativo
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="field">
                        <label className="label">*Concepto</label>
                        <div className="control">
                          <input
                            type="text"
                            placeholder="Nombre del producto"
                            id="CONCEPT"
                            name="CONCEPT"
                            className={
                              formik.touched.CONCEPT &&
                              Boolean(formik.errors.CONCEPT)
                                ? "input is-danger"
                                : "input"
                            }
                            value={formik.values.CONCEPT}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">*Importe</label>
                        <div className="control">
                          <input
                            type="number"
                            placeholder="Nombre del producto"
                            min="0"
                            step="0.01"
                            id="QUANTITY"
                            name="QUANTITY"
                            className={
                              formik.touched.QUANTITY &&
                              Boolean(formik.errors.QUANTITY)
                                ? "input is-danger"
                                : "input"
                            }
                            value={formik.values.QUANTITY}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">*Fecha pago/cobro</label>
                        <div className="control">
                          <input
                            type="date"
                            placeholder="Nombre del producto"
                            id="DATE"
                            name="DATE"
                            className={
                              formik.touched.DATE && Boolean(formik.errors.DATE)
                                ? "input is-danger"
                                : "input"
                            }
                            value={formik.values.DATE}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">*Comentario/Descripción</label>
                        <div className="control">
                          <textarea
                            placeholder=""
                            id="DESCRIPTION"
                            name="DESCRIPTION"
                            className={
                              formik.touched.DESCRIPTION &&
                              Boolean(formik.errors.DESCRIPTION)
                                ? "textarea is-danger"
                                : "textarea"
                            }
                            value={formik.values.DESCRIPTION}
                            onChange={formik.handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">*Método de pago/cobro</label>
                        <div className="control">
                          <div
                            className={
                              formik.touched.PAYMENT_METHOD &&
                              Boolean(formik.errors.PAYMENT_METHOD)
                                ? "select is-fullwidth is-danger"
                                : "select is-fullwidth"
                            }
                          >
                            <select
                              id="PAYMENT_METHOD"
                              name="PAYMENT_METHOD"
                              value={formik.values.PAYMENT_METHOD}
                              onChange={formik.handleChange}
                            >
                              <option disabled value={"default"}>
                                Método
                              </option>
                              <option value={"Efectivo"}>Efectivo</option>
                              <option value={"Cheque"}>Cheque</option>
                              <option value={"Tarjeta de Crédito"}>
                                Tarjeta de Crédito
                              </option>
                              <option value={"Tarjeta de Débito"}>
                                Tarjeta de Débito
                              </option>
                              <option value={"Transferencia Electrónica"}>
                                Transferencia Electrónica
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      Comprobante de Pago/Cobro
                    </p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <article className="message is-success">
                        <div className="message-body">
                          Requisitos del Comprobante
                          <br />
                          Para que tu Cobro/Pago sea válido, deberás anexar una
                          imagen de tu comprobante. Este comprobante deberá ser:{" "}
                          <strong>
                            Ticket de compra, Factura, Recibo, Comprobante de
                            Tranferencia Bancaria{" "}
                          </strong>
                          .
                          <br /> Es necesario que el monto del comprobante y la
                          fecha coincidan con los datos ingresados en el
                          sistema, de otro modo, este no será tomado en cuenta.
                        </div>
                      </article>

                      <div className="file has-name is-boxed is-fullwidth">
                        <label className="file-label">
                          <input
                            onChange={(e) =>
                              setFileName(e.target.files[0].name)
                            }
                            ref={ticket}
                            className="file-input"
                            type="file"
                            name="resume"
                            accept="image/png,image/gif,image/jpeg, image/jpg"
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <FontAwesomeIcon icon={faUpload} />
                            </span>
                            <span
                              className="file-label is-center"
                              style={{ textAlign: "center" }}
                            >
                              Seleccione un archivo
                            </span>
                          </span>
                          <span
                            className="file-name"
                            style={{ textAlign: "center" }}
                          >
                            {fileName}
                          </span>
                        </label>
                      </div>
                      <br />
                      <button
                        type="submit"
                        className="button is-fullwidth is-success"
                        disabled={!fileName}
                      >
                        REGISTRAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Newoutcome;
