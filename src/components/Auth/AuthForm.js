import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();

  // use Hook useRef() để lấy dữ liệu từ input
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // gọi useContext và kết nối nó vs AuthContext => allow access vào authCtx
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Sẽ active khi user gửi form (any we at chế độ nào), nhận đối tượng event
  const submitHandler = (event) => {
    // Gọi event.preventDefault() để ngắn browser mặc định auto gửi request
    event.preventDefault();

    // Trích xuất data đã entered
    // - Ghi lại mọi lần gõ phím vs useState(), sau đó lấy dữ liệu từ đó.
    // - use ref và kết nối ref vs elments đầu vào để lấy dữ liệu đã entered vs help of ref.
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // opitional: Add validation (thêm xác thực đầu vào của user)

    // đặt isLoading thành true nếu WE start gửi request or đặt ngay trc khi thực hiện trong khối if-else vì cũng sẽ sớm gửi request trong if.
    setIsLoading(true);

    let url;
    // Điều kiện kiểm tra chế độ đăng nhập
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0Apiek4pS4hZ8RDvY2QJ0zNA4Y3f4BeA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0Apiek4pS4hZ8RDvY2QJ0zNA4Y3f4BeA";
    }
    // dựa vào if else, gửi request đến endpoint thích hợp.
    // use chức năng tìm nạp dữ liệu với fetch()
    // create a new email and password user by issuing an HTTP POST request to the Auth signupNewUser endpoint.
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        //đảm bảo Auth REST API biết we some data
        "Content-Type": "application/json",
      },
      // fetch trả về promise => thêm catch để xử lý lỗi or xử lý responses #.
    })
      .then((res) => {
        // Sau khi nhận dc phản hồi (res) (0 cần biết lỗi hay 0) đặt isLoading thành false.
        setIsLoading(false);
        if (res.ok) {
          // kiểm tra xem phản hồi có ổn ko? // Dữ liệu nhận về khi đăng nhập thành công
          return res.json();
        } else {
          // 0 thành công, thì thông báo 1 số lỗi
          // Data phản hồi nhận (trả) lại sẽ chứa some info bổ sung.
          // res.json() cũng trả về 1 promise, vì vậy có thể gọi nó để có quyền truy cập vào data phản hồi thực tế.
          return res.json().then((data) => {
            // show an error modal
            // console.log(data);
            let errorMessage = "Authentication failed!";
            // if(data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Xử lý dữ liệu nhận về từ sever
        // console.log(data);
        // - +data.expiresIn vì nhận về là string, thêm add + để chuyển thành number
        // - getTime() để lấy thời gian hiện tại
        // - expirationTime.toISOSstring() truyền nó dưới dạng string.
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString()); // hy vọng rằng, WE đang đặt mã token để phản ánh trạng thái xác thực đó trên UI user
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // use loading state để hiển thị nút (button) Create Account nếu 0 tải, hiển thị vòng quay tải or text nếu đang tải
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

/* //// --- Bước đầu ---- ////

import { useRef, useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // use Hook useRef() để lấy dữ liệu từ input
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Sẽ active khi user gửi form (any we at chế độ nào), nhận đối tượng event
  const submitHandler = (event) => {
    // Gọi event.preventDefault() để ngắn browser mặc định auto gửi request
    event.preventDefault();

    // Trích xuất data đã entered
    // - Ghi lại mọi lần gõ phím vs useState(), sau đó lấy dữ liệu từ đó.
    // - use ref và kết nối ref vs elments đầu vào để lấy dữ liệu đã entered vs help of ref.
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // opitional: Add validation (thêm xác thực đầu vào của user)

    // đặt isLoading thành true nếu WE start gửi request or đặt ngay trc khi thực hiện trong khối if-else vì cũng sẽ sớm gửi request trong if.
    setIsLoading(true);
    // Điều kiện kiểm tra chế độ đăng nhập
    if (isLogin) {
      //...
    } else {
      // if 0 ở chế độ login, gửi request đến endpoint thích hợp.
      // use chức năng tìm nạp dữ liệu với fetch()
      // create a new email and password user by issuing an HTTP POST request to the Auth signupNewUser endpoint.
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0Apiek4pS4hZ8RDvY2QJ0zNA4Y3f4BeA",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            //đảm bảo Auth REST API biết we some data
            "Content-Type": "application/json",
          },
          // fetch trả về promise => thêm catch để xử lý lỗi or xử lý responses #.
        }
      ).then((res) => {
        // Sau khi nhận dc phản hồi (res) (0 cần biết lỗi hay 0) đặt isLoading thành false.
        setIsLoading(false);
        if (res.ok) {
          // kiểm tra xem phản hồi có ổn ko?
          //...
        } else {
          // 0 thành công, thì thông báo 1 số lỗi
          // Data phản hồi nhận (trả) lại sẽ chứa some info bổ sung.
          // res.json() cũng trả về 1 promise, vì vậy có thể gọi nó để có quyền truy cập vào data phản hồi thực tế.
          return res.json().then((data) => {
            // show an error modal
            // console.log(data);
            let errorMessage = "Authentication failed!";
            // if(data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            alert(errorMessage);
          });
        }
      });
    }
  };
  // use loading state để hiển thị nút (button) Create Account nếu 0 tải, hiển thị vòng quay tải or text nếu đang tải
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
*/

/*
Hoạt động của UD
- Sau khi xong các bước trên => kiểm tra UD ở browser
VD: nhập trường email là test@test.com, trường password có 4 kí tự any. Click Create Account
=> Xem kết quả ở console (bảng điều khiển nhật ký)
- Gặp lỗi (some error dc Firebase gửi lại)
VD: code: 400
message: 'WEAK_PASSWORD : Password...' (Yếu, nên có ít nhất 6 kí tự)( đơn giản là 1 hạn chế or cơ chế bảo mật của Firebase)

- Nếu nhập các trường hợp lệ: Kiểm tra ở page browser Firebae project name sẽ thấy user mà WE vừa create = email vs some ID user unique, dc tạo auto bơi Firebase.
*/
