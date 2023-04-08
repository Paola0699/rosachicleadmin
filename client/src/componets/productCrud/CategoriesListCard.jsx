import React, { Fragment, useEffect, useState } from "react";
import { deleteCategory } from "../../services/categoryService";
import CategoryDetailsModal from "./CategoryDetailsModal";
import firebase from "../../firebaseElements/firebase";
const db = firebase.firestore();

const CategoriesListCard = () => {
  const [open, setOpen] = useState(false);
  const [categoryDet, setCategoryDet] = useState();
  const [categoriesList, setCategoriesList] = useState([]);

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
    <Fragment>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Categorías</p>
        </header>
        <div className="card-content">
          <div className="content">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((cat) => (
                  <tr key={cat.id}>
                    <td> {cat.name} </td>
                    <td>
                      <button
                        style={{ marginRight: "3%" }}
                        onClick={() => deleteCategory(cat)}
                        className="button is-success is-outlined is-small"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => {
                          setOpen(true);
                          setCategoryDet(cat);
                        }}
                        className="button is-success is-small"
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {categoryDet ? (
        <CategoryDetailsModal
          open={open}
          setOpen={setOpen}
          categoryDet={categoryDet}
        />
      ) : null}
    </Fragment>
  );
};

export default CategoriesListCard;
