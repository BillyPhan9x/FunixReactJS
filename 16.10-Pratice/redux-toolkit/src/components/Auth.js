import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import styles from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = enteredPassword.trim().length > 0;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  // Hàm xử lý sự kiện gửi, dc kích hoạt sau khi form dc gửi, ràng buộc hàm vs onSubmit trên phần tử form trong code JSX
  const fromSubmitHandler = (event) => {
    // Gọi event.preventDefault() trong hàm xử lý sự kiện submit form để ngăn hành vi submit mặc định của trình duyệt (hành vi mặc định này làm toàn bộ UD phải tải lại, đây là điều we 0 muốn xảy ra tại UD React)
    event.preventDefault();
    // Đặt trạng thái enteredEmailTouched thành “true” trước khi biểu mẫu được gửi
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    // Kiểm tra đk nếu giá trị đã nhập là 1 giá trị rỗng
    if (!formIsValid) {
      return;
    }

    dispatch(authActions.login());
    // reset enteredEmail = cách gọi setEnteredEmail và truyền vào 1 empty string.
    // Và cần thêm ràng buộc giá trị đã nhập (Tow way binding) trở lại đầu vào via value prop.
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  return (
    <main className={styles.auth}>
      <form onSubmit={fromSubmitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
          {emailInputIsInvalid && (
            <p style={{ color: "red" }}>Please enter a valid email.</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
          />
          {passwordInputIsInvalid && (
            <p style={{ color: "red" }}>Please enter password.</p>
          )}
        </div>
        <button>Login</button>
      </form>
    </main>
  );
};

export default Auth;
