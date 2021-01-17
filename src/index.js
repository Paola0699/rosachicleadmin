import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from "react-router-dom";
import Home from './componets/Home'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
      <div>
        {/* <Route render={({ location }) => (location.state && location.state.is404 ? <Error404 /> : <Home />)} /> */}
        <Home/>
      </div>
  </BrowserRouter>,
  document.getElementById("root")
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
