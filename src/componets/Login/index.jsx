import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

// Sections
/* import Header from "./Header";
 */

// Components
import Helmet from "../common/Helmet";
import Switch from "../common/Switch";
import ProductCrud from '../productCrud'

function Login() {
  return (
    <div className="App">
      <h1>Hola</h1>
    </div>
  );
}

const routes = [
  {
    path: "",
    component: <Login />,
  },
  {
    path: "producto",
    component: <ProductCrud />,
  },
];

function Home() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Helmet title="THE MIXER ADMIN" />
      {/*  <Header /> */}
      <Switch>
        {routes.map((item, index) => (
          <Route key={index} path={`${path}${item.path}`} exact>
            {item.component}
          </Route>
        ))}

      </Switch>
    </div>
  );
}

export default Home;


