import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// Components
import Helmet from "./common/Helmet";
import Switch from "./common/Switch";
import ProductCrud from './productCrud'
import Products from './productCrud/products'
import Login from './Login'
const routes = [
  {
    path: "",
    component: <Login />,
  },
  {
    path: "producto",
    component: <ProductCrud />,
  },
  {
    path: "productos",
    component: <Products />,
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