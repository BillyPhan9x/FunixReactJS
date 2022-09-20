// Using the Context
import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

// Working on the "Shopping Cart" Component
const HeaderCartButton = (props) => {
  const [isHighlingted, setIsHighLingted] = useState(false);
  // Gọi ngữ cảnh use, chuyển ngữ cảnh giỏ hàng vào để có quyền truy cập vào ngữ cảnh đó dc quản lý bởi nhà cung cấp use.
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setIsHighLingted(true);

    const timer = setTimeout(() => {
      setIsHighLingted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnStyles = `${styles.button} ${isHighlingted ? styles.bump : ""}`;

  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

// HeaderCartButton.js để hiển thị danh sách số lượng sản phẩm trong giỏ hàng, đồng thời khi click vào Component này cũng sẽ hiển thị ra giỏ hàng
// Giỏ hàng sẽ được hiển thị mỗi khi nhấn vào HeaderCartButton

// = cách (useContext) use ngữ cảnh (CartContext), thành phần nút giỏ hàng tiêu đề sẽ được đánh giá lại = cách phản ứng bất cứ khi nào bối cảnh thay đổi. Nó sẽ thay đổi khi cập nhật nó trong nhà cung cấp giỏ hàng một thành phần. (thiết lập kết nối)
