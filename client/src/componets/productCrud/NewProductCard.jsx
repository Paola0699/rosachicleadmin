import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import firebase from "../../firebaseElements/firebase";
import { useFormik } from "formik";
import { productValidationSchema } from "../../validationSchema/productValidationSchema";
import { postNewProduct } from "../../services/productsService";
const db = firebase.firestore();

const NewProductCard = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      NOMBRE: "",
      CATEGORIA: "default",
      DESCRIPCION: "",
      CALORIAS: 0,
      DISPONIBILIDAD: true,
      PRECIO_VENTA: 0,
      COSTO_PRODUCCION: 0,
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      postNewProduct(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    db.collection("categories").onSnapshot((doc) => {
      let allCategories = doc.docs.map((cat) => {
        return {
          id: cat.id,
          ...cat.data(),
        };
      });
      setCategoriesList(allCategories);
    });
  }, []);

  return (
    <form className="column" onSubmit={formik.handleSubmit}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Nuevo Producto</p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  id="NOMBRE"
                  name="NOMBRE"
                  className={
                    formik.touched.NOMBRE && Boolean(formik.errors.NOMBRE)
                      ? "input is-danger"
                      : "input"
                  }
                  value={formik.values.NOMBRE}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Categoría</label>
              <div className="control">
                <div
                  className={
                    formik.touched.CATEGORIA && Boolean(formik.errors.CATEGORIA)
                      ? "select is-fullwidth is-danger"
                      : "select is-fullwidth"
                  }
                >
                  <select
                    id="CATEGORIA"
                    name="CATEGORIA"
                    value={formik.values.CATEGORIA}
                    onChange={formik.handleChange}
                  >
                    <option disabled value="default">
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
            <div className="field">
              <label className="label">Descripción</label>
              <div className="control">
                <textarea
                  placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"
                  id="DESCRIPCION"
                  name="DESCRIPCION"
                  className={
                    formik.touched.DESCRIPCION &&
                    Boolean(formik.errors.DESCRIPCION)
                      ? "textarea is-danger"
                      : "textarea"
                  }
                  value={formik.values.DESCRIPCION}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Calorias</label>
              <div className="control">
                <input
                  type="number"
                  placeholder="Calorias del producto"
                  id="CALORIAS"
                  name="CALORIAS"
                  className={
                    formik.touched.CALORIAS && Boolean(formik.errors.CALORIAS)
                      ? "input is-danger"
                      : "input"
                  }
                  value={formik.values.CALORIAS}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Costo de Producción</label>
              <div className="control  has-icons-left">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  id="COSTO_PRODUCCION"
                  name="COSTO_PRODUCCION"
                  className={
                    formik.touched.COSTO_PRODUCCION &&
                    Boolean(formik.errors.COSTO_PRODUCCION)
                      ? "input is-danger"
                      : "input"
                  }
                  value={formik.values.COSTO_PRODUCCION}
                  onChange={formik.handleChange}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Precio de venta</label>
              <div className="control  has-icons-left">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  id="PRECIO_VENTA"
                  name="PRECIO_VENTA"
                  className={
                    formik.touched.PRECIO_VENTA &&
                    Boolean(formik.errors.PRECIO_VENTA)
                      ? "input is-danger"
                      : "input"
                  }
                  value={formik.values.PRECIO_VENTA}
                  onChange={formik.handleChange}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </div>
            </div>
            <label className="checkbox">
              <input
                name="DISPONIBILIDAD"
                value={"DISPONIBILIDAD"}
                type="checkbox"
                onChange={formik.handleChange}
                defaultChecked={formik.values.DISPONIBILIDAD}
              />{" "}
              Disponibilidad del Producto
            </label>
            <br />
            <br />
            <button
              type="submit"
              value="Submit"
              className="button is-success is-fullwidth"
            >
              Crear Producto
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewProductCard;
