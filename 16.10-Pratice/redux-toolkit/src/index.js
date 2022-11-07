import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Thiết lập store cho toàn bộ UD, thiết lập nó làm giá trị cho store prop trên thành phần Provider
  <Provider store={store}>
    <App />
  </Provider>
);
