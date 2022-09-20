import { useRef, useState } from "react";

import Input from "../../UI/Input";

import styles from "./MealItemForm.module.css";

// Adding a Form
// MealItemForm.js: Hiển thị Form để có thể thêm món ăn đó vào giỏ hàng.
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    // Chuyển đổi từ string -> number
    const enteredNumberAmount = +enteredAmount;

    // Kiểm tra giá trì đầu vào input có hợp lệ 0? Nếu 0 thì ko thực thi
    if (
      enteredAmount.trim().length === 0 ||
      enteredNumberAmount < 1 ||
      enteredNumberAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    if (enteredNumberAmount) {
      setAmountIsValid(true);
    }
    props.onAddToCart(enteredNumberAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <span className={styles.text}>Please enter a valid amount (1-5).</span>
      )}
    </form>
  );
};

export default MealItemForm;
