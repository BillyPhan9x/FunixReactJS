import { useContext } from "react";

import Modal from "../UI/Modal";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import styles from "./Cart.module.css";
// Adding the "Cart" Button Component
// Component Cart tượng trưng cho giỏ hàng, tạo chức năng hiển thị giỏ hàng cho người dùng
// Kết với với Component Modal để khi click vào backdrop sẽ ẩn chức năng hiển thị giỏ hàng
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onDelete={cartItemDeleteHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span className={styles["total-amount"]}>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

// Các dữ liệu ở Modal này sẽ được lấy từ CartContext. Khi nhấn vào nút “Close" thì sẽ đóng Modal.
