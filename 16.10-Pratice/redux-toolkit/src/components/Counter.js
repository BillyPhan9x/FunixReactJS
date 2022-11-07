import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
import styles from "./Counter.module.css";

const Counter = () => {
  // use bộ chọn và đi sâu vào trạng thái để đọc (nhận) 1 giá trị từ trạng thái đó.
  // Cần use các định danh dc gán vào trong ánh xạ reducer thì mới có thể truy cập các slice trạng thái cụ thể dc.
  const counter = useSelector((state) => state.counter.counter);
  // trích xuất show từ state showCounter
  // Sử dụng Hook useSelector() xây dựng điều kiện hiển thị
  const show = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();

  // hàm xử lý sự kiện tăng counter và chuyển hành động vs dispatch
  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  // hàm increaseHandler() bao gồm action và payload
  // các hành động gửi đi thường có thể kèm theo giá trị hay dữ liệu (Payload)
  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // {type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  };

  // hàm xử lý sự kiện giảm counter và chuyển hành động vs dispatch
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  // hàm xử lý sự kiện hiện và ẩn counter với state showCounter boolean
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <div className={styles.counter}>
      <h1>REDUX COUNTER</h1>
      {show && <div className={styles.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Tooggle Counter</button>
    </div>
  );
};

export default Counter;
