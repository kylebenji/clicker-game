import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ClickerGame from "./Components/ClickerGame";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ClickerGame />
    </Provider>
  </React.StrictMode>
);
