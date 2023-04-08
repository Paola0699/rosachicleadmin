import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { editProductValidationSchema } from "../../validationSchema/productValidationSchema";
import { updateProduct } from "../../services/productsService";

const ProductDetailsModal = ({ open, setOpen, orderDetail }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      CALORIAS: orderDetail.cal,
      COSTO_PRODUCCION: orderDetail.cost,
      PRECIO_VENTA: orderDetail.price,
      DESCRIPCION: orderDetail.description,
      DISPONIBILIDAD: orderDetail.available,
    },
    validationSchema: editProductValidationSchema,
    onSubmit: async (values) => {
      const newOrderDetail = {
        ...values,
        ORDER_ID: orderDetail.id,
        NOMBRE: orderDetail.name,
      };
      updateProduct(newOrderDetail);
    },
  });
  return (
    <Modal open={open} onClose={() => setOpen(false)} center className="modal">
      <div style={{ padding: "2.8rem" }}>
        <h1 className="title">Producto: {orderDetail.name}</h1>
        <h2 className="subtitle">Categoría: {orderDetail.category}</h2>
        <form onSubmit={formik.handleSubmit}>
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
            <p className="help is-danger">
              {formik.touched.CALORIAS && formik.errors.CALORIAS}
            </p>
          </div>

          <div className="field">
            <label className="label">Costo de Producción</label>
            <div className="control  has-icons-left">
              <input
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
                type="number"
                min="0"
                step="0.01"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
            </div>
            <p className="help is-danger">
              {formik.touched.COSTO_PRODUCCION &&
                formik.errors.COSTO_PRODUCCION}
            </p>
          </div>

          <div className="field">
            <label className="label">Precio de Venta</label>
            <div className="control  has-icons-left">
              <input
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
                type="number"
                min="0"
                step="0.01"
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faDollarSign} />
              </span>
            </div>
            <p className="help is-danger">
              {formik.touched.PRECIO_VENTA && formik.errors.PRECIO_VENTA}
            </p>
          </div>

          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <textarea
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
                placeholder="e.g. Naranja, Guayaba, Piña, Miel, Limón, Jengibre"
              ></textarea>
            </div>
            <p className="help is-danger">
              {formik.touched.DESCRIPCION && formik.errors.DESCRIPCION}
            </p>
          </div>

          <label className="checkbox">
            <input
              name="DISPONIBILIDAD"
              value={"DISPONIBILIDAD"}
              type="checkbox"
              onChange={formik.handleChange}
              defaultChecked={formik.values.DISPONIBILIDAD}
            />
            Disponibilidad del Producto
          </label>
          <br />
          <br />
          <button
            type="submit"
            value="Submit"
            className="button is-success is-fullwidth"
          >
            Editar Producto
          </button>
        </form>
      </div>
      <div className="modal-footer"></div>
    </Modal>
  );
};

export default ProductDetailsModal;
