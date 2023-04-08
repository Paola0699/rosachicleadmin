import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import Modal from "react-responsive-modal";
import { editCategoryValidationSchema } from "../../validationSchema/categoryValidationSchema";
import { updateCategory } from "../../services/categoryService";

const CategoryDetailsModal = ({ open, setOpen, categoryDet }) => {
  const [fileName, setFileName] = useState("");
  const categoryCover = useRef();
  function closeModal() {
    setOpen(false);
    setFileName("");
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      DESCRIPCION: categoryDet.description,
      PROVEEDOR_EXTERNO: categoryDet.extern,
      CATEGORIA_VISIBLE: categoryDet.visible,
    },
    validationSchema: editCategoryValidationSchema,
    onSubmit: (values) => {
      updateCategory(categoryDet, values, fileName, categoryCover);
    },
  });
  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setFileName(this.result);
    };
  }
  return (
    <Modal open={open} onClose={closeModal} center>
      <form onSubmit={formik.handleSubmit}>
        <br />
        <div className="field">
          <h1 style={{ fontSize: "1.5rem" }}>
            Nombre Categoría: <b>{categoryDet.name}</b>
          </h1>
        </div>

        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <textarea
              placeholder="Descripción de la Categoría"
              id="DESCRIPCION"
              name="DESCRIPCION"
              className={
                formik.touched.DESCRIPCION && Boolean(formik.errors.DESCRIPCION)
                  ? "textarea is-danger"
                  : "textarea is-primary"
              }
              value={formik.values.DESCRIPCION}
              onChange={formik.handleChange}
            ></textarea>
          </div>
        </div>

        <label className="label">Portada</label>
        <img
          style={{ width: "25rem" }}
          src={fileName ? fileName : categoryDet.cover}
          alt="ticketImg"
        />
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input
              onChange={(e) => previewFile(e.target.files[0])}
              ref={categoryCover}
              className="file-input"
              type="file"
              name="resume"
              accept="image/x-png,image/gif,image/jpeg"
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
              />
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
              />
              Categoria Visible
            </label>
          </div>
        </div>

        <button
          type="submit"
          value="submit"
          className="button is-success is-fullwidth"
        >
          Modificar Categoría
        </button>
      </form>
    </Modal>
  );
};

export default CategoryDetailsModal;
