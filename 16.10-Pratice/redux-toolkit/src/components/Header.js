import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import styles from "./Header.module.css";

const Header = () => {
  // use bộ chọn và đi sâu vào trạng thái để đọc (nhận) 1 giá trị từ trạng thái đó.
  // Cần use các định danh dc gán vào trong ánh xạ reducer thì mới có thể truy cập các slice trạng thái cụ thể dc.
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // hàm xử lý sự kiện khi người dùng click vào nút để đăng xuất
  const logoutUserHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={styles.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutUserHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
