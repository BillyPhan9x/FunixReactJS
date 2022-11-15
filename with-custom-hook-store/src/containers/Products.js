import React from "react";
import { useStore } from "../hooks/store";

import ProductItem from "../components/Products/ProductItem";
import "./Products.css";

const Products = (props) => {
  //   - Gọi useStore(), 0 cần đối số, use destructuring để lấy giá trị và hàm dispatch
  // - Vì file này 0 cần hàm cập nhật nên có thể lấy mỗi giá trị ==>
  // Trích xuất phần tử đầu tiên trong mảng = Syntax const state = useStore()[0]
  const state = useStore()[0];
  console.log("state", state);
  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;

// - Vì khoá products in state. Đã setup in products-store.js khi khởi tạo trạng thái, đối số thứ 2 truyền vào initStore là 1 {} có khoá products.
// - file store.js, initialState sẽ dc hợp nhất vs globalState => do đó, globalState sẽ có 1 khoá products, nên ta CAN truy cập khoá đó.
