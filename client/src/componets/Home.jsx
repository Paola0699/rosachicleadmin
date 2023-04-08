import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// Components
import Helmet from "./common/Helmet";
import Switch from "./common/Switch";
import { ProductCrud } from "./productCrud/index";
import Products from "./productCrud/products";
import Newsale from "./saleCrud/newsale";
import Login from "./Login";
import Sales from "./saleCrud/sales";
import Salescat from "./saleCrud/salescat";
import Balance from "./generalbalance";
import Newoutcome from "./outcomesCrud/newoutcome";
import Outcomes from "./outcomesCrud/outcomes";
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
  {
    path: "nueva-venta",
    component: <Newsale />,
  },
  {
    path: "ventas",
    component: <Sales />,
  },
  {
    path: "ventas-desglosado",
    component: <Salescat />,
  },
  {
    path: "balance-general",
    component: <Balance />,
  },
  {
    path: "alta-gasto",
    component: <Newoutcome />,
  },
  {
    path: "gastos",
    component: <Outcomes />,
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
