import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price, id } = props.item;

  // Hàm xử lý thêm mục vào giỏ hàng
  const addItemToCartHandler = () => {
    // gửi 1 actions từ lát Cart và mang theo dữ liệu
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };
  // Hàm xử lý xoá mục khỏi giỏ hàng
  const removeItemFromCartHandler = () => {
    // gửi 1 actions từ lát Cart và mang theo dữ liệu
    dispatch(cartActions.removeItemFormCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}> (${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCartHandler}>-</button>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
