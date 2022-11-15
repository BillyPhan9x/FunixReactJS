import React from "react";
import { useStore } from "../../hooks/store";

import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = React.memo((props) => {
  console.log("RERENDRING");
  // - Gọi useStore(), chỉ quan tâm đến hàm dispatch nên cần Trích xuất phần tử thứ 2 trong mảng = Syntax const dispatch = useStore()[1];
  const dispatch = useStore(false)[1];

  const toggleFavHandler = () => {
    // Gọi hàm dispatch trong hàm xử lý chuyển đổi mục ưa thích.
    // Truyền vào là 1 actionIdentifier để gửi đi 1 hành động
    dispatch("TOGGLE_FAV", props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
