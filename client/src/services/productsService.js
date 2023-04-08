import Swal from 'sweetalert2';
import firebase from '../firebaseElements/firebase';
const db = firebase.firestore();

export const updateProduct = async (orderDetail) => {
    const {CALORIAS, COSTO_PRODUCCION, DESCRIPCION, DISPONIBILIDAD, PRECIO_VENTA, NOMBRE, ORDER_ID} = orderDetail;
    const result = await Swal.fire({
      icon: "warning",
      title: `¿Seguro que quiere modificar ${NOMBRE}?`,
      showDenyButton: true,
      confirmButtonText: `Si, modificalo`,
      denyButtonText: `No`,
    });
    if (result.isConfirmed) {
      db.collection("products")
        .doc(ORDER_ID)
        .update({
          cal: Number(CALORIAS),
          cost: Number(COSTO_PRODUCCION),
          price: Number(PRECIO_VENTA),
          description: DESCRIPCION,
          available: DISPONIBILIDAD,
        })
        .then(() => {
          Swal.fire(
            "Actualizado!",
            "El status se actulizo con exito",
            "success"
          );
        })
        .catch((error) =>
          Swal.fire("Error!", `Ocurrio un error: ${error}`, "warning")
        );
    }
  };

export const deleteProduct = async (product) => {
    console.log(product.id);
    const result = await Swal.fire({
      icon: "warning",
      title: `¿Seguro que quiere eliminar${product.name}?`,
      showDenyButton: true,
      confirmButtonText: `Si, eliminar`,
      denyButtonText: `No`,
    });
    if (result.isConfirmed) {
      db.collection("products")
        .doc(product.id)
        .delete()
        .then(() => {
          Swal.fire("Producto eliminado", "", "success");
        })
        .catch((error) => {
          Swal.fire(`Ocurrio un error: ${error}`, "", "error");
        });
    }
};