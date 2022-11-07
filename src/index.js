import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// BrowserRouter: Là thành phần bao bọc các thành phần có định tuyến bên trong, nó use History API có trong HTML5 để theo dõi lịch sử bộ định tuyến của bạn.
