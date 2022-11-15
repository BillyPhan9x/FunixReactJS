import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
// Nhập configureStore từ file products-store inside foler hook-store
import configureStore from "./hooks/products-store";

// Gọi hàm configureStore để thiết lập store.
configureStore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// Có thể gọi all các hàm configureStore() cho các store # nhau trong UD (vì export default)
