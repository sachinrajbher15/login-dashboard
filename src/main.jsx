import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

// Create a root element using ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with the Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
