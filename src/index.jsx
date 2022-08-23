import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import App from "./App"

const store = createStore(rootReducer);


ReactDOM.render(
    <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    </React.StrictMode>,
  document.getElementById("root")
);
