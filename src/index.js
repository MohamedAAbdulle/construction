import { AppContext } from "AppContext";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <AppContext>
      <App />
    </AppContext>
  </BrowserRouter>,
  document.getElementById("root")
);
