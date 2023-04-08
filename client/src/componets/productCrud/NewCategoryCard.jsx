import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { categoryValidationSchema } from "../../validationSchema/categoryValidationSchema";
import { postNewCategory } from "../../services/categoryService";

const NewCategoryCard = () => {
  const [fileName, setFileName] = useState("");
  const categoryCover = useRef();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      NOMBRE: "",
      DESCRIPCION: "",
      PROVEEDOR_EXTERNO: false,
      CATEGORIA_VISIBLE: true,
    },
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      postNewCategory(categoryCover, values);
      formik.resetForm();
    },
  });
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Nueva Categoría</p>
      </header>
      <div className="card-content">
        <div className="content">
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <label className="label">Nombre Categoría</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Nombre Categoría"
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
              <label className="label">Descripción</label>
              <div className="control">
                <textarea
                  placeholder="Descripción de la Categoría"
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

            <label className="label">Portada</label>
            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <input
                  onChange={(e) => setFileName(e.target.files[0].name)}
                  ref={categoryCover}
                  className="file-input"
                  type="file"
                  name="resume"
                  accept="image/png,image/gif,image/jpeg, image/jpg"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Elige un Archivo...</span>
                </span>
                <span className="file-name">{fileName}</span>
              </label>
            </div>

            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "2%",
              }}
            >
              <div>
                <label className="checkbox">
                  <input
                    name="PROVEEDOR_EXTERNO"
                    value={"PROVEEDOR_EXTERNO"}
                    type="checkbox"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.PROVEEDOR_EXTERNO}
                  />{" "}
                  Proveedor Externo
                </label>
              </div>
              <div>
                <label className="checkbox">
                  <input
                    name="CATEGORIA_VISIBLE"
                    value={"CATEGORIA_VISIBLE"}
                    type="checkbox"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.CATEGORIA_VISIBLE}
                  />{" "}
                  Categoria Visible
                </label>
              </div>
            </div>

            <button
              type="submit"
              value="submit"
              className="button is-success is-fullwidth"
              disabled={!fileName}
            >
              Crear Categoría
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryCard;
