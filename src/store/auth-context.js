import React, { useCallback, useEffect, useState } from "react";

// Tạo biến logoutTimer để tham chiếu tới hàm setTimeout()
// (global) ban đầu là 0 xác định, undefined
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// hàm tính thời gian còn lại (hàm trợ giúp)
const caculateRemainingTime = (expirationTime) => {
  // trả về thời lượng còn lại tính = mili s
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration; // giá trị âm(-)
};

// hàm retrieveStoredToken() (hàm trợ giúp)
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  // Xác định thời gian còn lại
  const remainingTime = caculateRemainingTime(storedExpirationDate);

  // Kiểm tra điều kiện, xóa dữ liệu trong localStorage
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  // Trả về storedToken, remainingTime khi có đủ điều kiện
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// Xuất Thành phần AuthContextProvider quản lý trạng thái Login/Logout
export const AuthContextProvider = (props) => {
  // Gọi hàm retrieveStoredToken()
  const tokenData = retrieveStoredToken();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }
  // const initialToken = localStorage.getItem('token'); // lấy dữ liệu
  // const [token, setToken] = useState(null); //  null or ''
  const [token, setToken] = useState(initialToken);

  // Kiểm tra điều kiện true/false với cú pháp !!token (resp or result của việc kiểm tra xem mã thông báo có phải là 9 xác hay 0 và đối chiếu (chuyển đổi giá trị truthy or falsy thành giá trị Boolean true or false)
  //  Nếu mã token là 1 string empty => sẽ trả về false. (1 thủ thuật JS mặc định)
  const userLoginIn = !!token;

  // Các hàm thay đổi trạng thái Logout/Login
  const logoutHandler = useCallback(() => {
    setToken(null); // đặt mã thông báo thành null, để xoá token của mình.
    localStorage.removeItem("token"); // xoá lưu trữ
    localStorage.removeItem("expirationTime"); // Xóa dữ liệu in localStorage khi user đăng xuất

    if (logoutTimer) {
      clearTimeout(logoutTimer); // xoá timer đó nếu timer đã dc thiết lập
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token); // cần lấy token là đối số
    localStorage.setItem("token", token); // tạo 1 lưu trữ
    localStorage.setItem("expirationTime", expirationTime); // tạo 1 lưu trữ

    const remainingTime = caculateRemainingTime(expirationTime); // ml/s

    // Gọi setTimeout và trỏ tới hàm logoutHandler để hàm đó thực thi nếu bộ đếm time đó hết hạn
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  // - Thêm hàm logoutHandler để đảm bảo rằng hàm này 0 dc tạo lại 1 cách 0 cần thiết để ngăn chặn các vòng lặp vô hạn or các thực thi hiệu ứng 0 cần thiết.

  // Truyền dữ liệu contextValue qua props
  const contextValue = {
    token: token,
    isLoggedIn: userLoginIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

/*
import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Xuất Thành phần AuthContextProvider quản lý trạng thái Login/Logout
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null); //  null or ''

  // Kiểm tra điều kiện true/false với cú pháp !!token (resp or result của việc kiểm tra xem mã thông báo có phải là 9 xác hay 0 và đối chiếu (chuyển đổi giá trị truthy or falsy thành giá trị Boolean true or false)
  //  Nếu mã token là 1 string empty => sẽ trả về false. (1 thủ thuật JS mặc định)
  const userLoginIn = !!token;

  // Các hàm thay đổi trạng thái Login/Logout
  const loginHandler = (token) => {
    setToken(token); // cần lấy token là đối số
    localStorage.setItem('token', token); // tạo 1 lưu trữ
  };

  const logoutHandler = () => {
    setToken(null); // đặt mã thông báo thành null, để xoá token của mình.
    localStorage.removeItem('token'); // xoá lưu trữ
  };

  // Truyền dữ liệu contextValue qua props
  const contextValue = {
    token: token,
    isLoggedIn: userLoginIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
*/

// Quản lý state trắng (app white state) của UD có 2 tuỳ chọn chính: Context API or Redux.

// - use Context API thì 0 cần install goi thứ 3
// - Trạng thái xác thực cũng 0 phải là state (changed rất thường xuyên). Vì vậy, sẽ 0 gặp any vấn đề hiệu suất nào.

// - Nhập React từ react, tạo AuthContext = cách gọi React.createContext();
// - Sau đó khởi tạo context vs some data initial dc set để xđ hình khối chung.
