import Swal from 'sweetalert2';
import firebase from '../firebaseElements/firebase';
const db = firebase.firestore();
export const postNewCategory = async (categoryData) => {
    const { NOMBRE, DESCRIPCION, PROVEEDOR_EXTERNO, CATEGORIA_VISIBLE} = categoryData;
    let newCat = {
      name: NOMBRE,
      visible: CATEGORIA_VISIBLE,
      description: DESCRIPCION,
      extern: PROVEEDOR_EXTERNO
    };
    db.collection("categories")
      .add(newCat)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Creada",
          text: `¡Categoria agregada con exito!`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Ocurrio un error: ${error}`,
        });
      });
  };

  export const deleteCategory = async(cat)  => {
    const result = await Swal.fire({
      icon: "warning",
      title: `¿Está seguro de eliminar la categoría ${cat.name}?`,
      showDenyButton: true,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    });
    if (result.isConfirmed) {
      db.collection("categories")
        .doc(cat.id)
        .delete()
        .then(() => {
          Swal.fire("Categoria eliminada", "", "success");
        })
        .catch((error) => {
          Swal.fire(`Ocurrio un error: ${error}`, "", "error");
        });
    }
  }

  export  const updateCategory = async (cat, categoryData) => {
    const { DESCRIPCION, PROVEEDOR_EXTERNO, CATEGORIA_VISIBLE} = categoryData;
    let newData = {};
  
    if (cat.visible && CATEGORIA_VISIBLE !== cat.visible) newData.visible = CATEGORIA_VISIBLE;
    if (cat.extern && PROVEEDOR_EXTERNO !== cat.extern) newData.extern = PROVEEDOR_EXTERNO;
    if (DESCRIPCION) newData.description = DESCRIPCION;

    db.collection("categories")
      .doc(cat.id)
      .update({
        ...newData,
      })
      .then(() => {
        Swal.fire("¡Categoría Actualizada!", "Se ha actualizado la categoría con éxito", "success");
      })
      .catch((error) =>
        Swal.fire("Error!", `Ocurrio un error: ${error}`, "warning")
      );
  }