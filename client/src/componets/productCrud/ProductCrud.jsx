import Navbar from "../common/navbar";
import Navbargen from "../common/navbargeneral";
import Breadcrum from "../common/breadcrum";
import { useState } from "react";
import firebase from "../../firebaseElements/firebase";
import { Redirect } from "react-router-dom";
import NewCategoryCard from "./NewCategoryCard";
import CategoriesListCard from "./CategoriesListCard";
import NewProductCard from "./NewProductCard";

function ProductCrud() {
  const db = firebase.firestore();
  //states
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

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      {usertype === "admin" ? <Navbar /> : <Navbargen />}
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Nuevo Producto</h1>
            <h2 className="subtitle">Alta de Productos</h2>
            <Breadcrum parent="Productos" children="Nuevo Producto" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <NewCategoryCard />
              <br />
              <CategoriesListCard />
            </div>
            <NewProductCard />
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProductCrud;
