import { useFormik } from "formik";
import React from "react";
import Modal from "react-responsive-modal";
import { editCategoryValidationSchema } from "../../validationSchema/categoryValidationSchema";
import { updateCategory } from "../../services/categoryService";

const CategoryDetailsModal = ({ open, setOpen, categoryDet }) => {
  function closeModal() {
    setOpen(false);
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
      updateCategory(categoryDet, values);
    },
  });

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
