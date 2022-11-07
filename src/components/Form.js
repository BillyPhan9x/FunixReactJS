import useInput from "../hooks/use-input";

// tạo hàm bên ngoài thành phần. Bởi vì hàm này 0 cần tạo lại nếu component dc XD lại
// đk xác thực các đầu vào input
const notEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const Form = () => {
  // Hook useInput() trả về 1 đối tượng nên có thể use kiến thức destructuring để trích xuất các giá trị. (lấy các khóa từ {} dc trả về đó, lưu trữ các giá trị và các hằng số hoàn toàn mới)
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(notEmpty);
  // đang truyền 1 hàm như 1 giá trị cho 1 hàm khác.

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  // => Lấy ra các dự liệu trả về từ hook custom => Thêm ràng buộc (props) cho các input

  // đk xác thực biểu mẫu đc kết hợp từ các đk xác thức # để nâng cao hiệu suất.
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // Hàm xử lý sự kiện gửi, dc kích hoạt sau khi form dc gửi, ràng buộc hàm vs onSubmit trên phần tử form trong code JSX
  const submitHandler = (event) => {
    // Gọi event.preventDefault() trong hàm xử lý sự kiện submit form để ngăn hành vi submit mặc định của trình duyệt (hành vi mặc định này làm toàn bộ UD phải tải lại, đây là điều we 0 muốn xảy ra tại UD React)
    event.preventDefault();
    console.log("Submitted!");
    console.log(enteredName, enteredEmail);

    // Kiểm tra đk nếu giá trị đã nhập là 1 giá trị rỗng
    if (!formIsValid) {
      return;
    }

    // Gọi hàm reset đầu vào
    // Và cần thêm ràng buộc giá trị đã nhập (Tow way binding) trở lại đầu vào via value prop.
    resetNameInput();
    resetEmailInput();
  };

  // Thay đổi Style của đầu vào vs đk lỗi, sau đó liên kết via prop để tạo style động
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default Form;

// - Cần truyền cho Hook useInput() 1 giá trị là hàm xác thực đầu vào như trong khi XD logic cho Hook useInput().
//     - Có thể xác định 1 hàm inline(nội tuyến). Trong đó nhận dc some giá trị rồi trả về kết quả gọi trim trên giá trị đó và so sánh nó vs 1 empty rỗng.
//      - Như vậy, logic ở đó chỉ là value thay vì enteredName.
//       - Đây là 1 hàm lỗi ẩn danh 0 dc thực thi nhưng dc định nghĩa inline. Sau đó dc truyền để use đầu vào. Vì vậy, nó nhận trên tham số validateValue ở hook custom.

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// import { useState } from "react";

// const Form = () => {
//   // Use useState() Hook để lấy và cập nhật dữ liệu từ input
//   const [enteredName, setEnteredName] = useState("");
//   // trạng thái để xđ user đã nhập dữ liệu đầu vào hay chưa
//   const [enteredNameTouched, setEnteredNameTouched] = useState(false);

//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

//   // Điều kiện xác thực cho đầu vào enteredNameIsValid
//   const enteredNameIsValid = enteredName.trim() !== "";
//   // XD đk xác thực đầu vào (nameInputIsInvalid) từ hai trạng thái enteredNameTouched và enteredNameIsValid
//   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//   const enteredEmailIsValid = enteredEmail.includes("@");
//   const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

//   // đk xác thực biểu mẫu đc kết hợp từ các đk xác thức # để nâng cao hiệu suất.
//   let formIsValid = false;
//   if (enteredNameIsValid) {
//     formIsValid = true;
//   }

//   // Hàm xử lý lắng nghe mọi lần gõ phím và lưu trữ giá trị trong trạng thái biến
//   // => Vì vậy, ở mỗi lần gõ phím, hàm đó sẽ dc kích hoạt và do đó enteredName state sẽ cập nhật.
//   const nameChangeHandler = (event) => {
//     // cập nhật enteredName vs setEnteredName ở mỗi lần gõ phím (mọi thay đổi xảy ra trên phần tử input)
//     // Vanilla JS, có quyền truy cập vào giá trị đã nhập
//     setEnteredName(event.target.value);
//   };

//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);
//   };

//   // Xác thực và phản hồi tới user khi blur khỏi đầu vào
//   // Trình xử lý sự kiện khi đầu vào 0 còn được focus (blur khỏi đầu vào)
//   const nameInputBlurHandler = (event) => {
//     setEnteredNameTouched(true);
//   };

//   const emailInputBlurHandler = (event) => {
//     setEnteredEmailTouched(true);
//   };

//   // Hàm xử lý sự kiện gửi, dc kích hoạt sau khi form dc gửi, ràng buộc hàm vs onSubmit trên phần tử form trong code JSX
//   const submitHandler = (event) => {
//     // Gọi event.preventDefault() trong hàm xử lý sự kiện submit form để ngăn hành vi submit mặc định của trình duyệt (hành vi mặc định này làm toàn bộ UD phải tải lại, đây là điều we 0 muốn xảy ra tại UD React)
//     event.preventDefault();
//     console.log(enteredName, enteredEmail);

//     // Đặt trạng thái enteredNameTouched thành “true” trước khi biểu mẫu được gửi
//     setEnteredNameTouched(true);
//     setEnteredEmailTouched(true);

//     // Kiểm tra đk nếu giá trị đã nhập là 1 giá trị rỗng
//     if (!formIsValid) {
//       return;
//     }

//     // reset enteredName = cách gọi setEnteredName và truyền vào 1 empty string.
//     // Và cần thêm ràng buộc giá trị đã nhập (Tow way binding) trở lại đầu vào via value prop.
//     setEnteredName("");
//     setEnteredNameTouched(false);

//     setEnteredEmail("");
//     setEnteredEmailTouched(false);
//   };

//   // Thay đổi Style của đầu vào vs trạng thái enterNameIsValid
//   const nameInputClasses = nameInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   const emailInputClasses = emailInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   return (
//     <form onSubmit={submitHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input
//           type="text"
//           id="name"
//           onChange={nameChangeHandler}
//           onBlur={nameInputBlurHandler}
//           value={enteredName}
//         />
//         {nameInputIsInvalid && (
//           <p className="error-text">Name must not be empty.</p>
//         )}
//       </div>
//       <div className={emailInputClasses}>
//         <label htmlFor="email">Your E-Mail</label>
//         <input
//           type="email"
//           id="email"
//           onChange={emailChangeHandler}
//           onBlur={emailInputBlurHandler}
//           value={enteredEmail}
//         />
//         {emailInputIsInvalid && (
//           <p className="error-text">Please enter a valid email.</p>
//         )}
//       </div>
//       <div className="form-actions">
//         <button disabled={!formIsValid}>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default Form;

// Use trạng thái enterNameIsValid hiển thị thông báo tới user

// 0 check xem nó có 0 hợp lệ hay 0 mà xem nó có hợp lệ 0.

// - Vì enteredNameIsValid chỉ đơn giản là thứ mà we có thể thu dc từ state enteredName.
//   - Và vì toàn bộ hàm component SimpleInput sẽ thực thi lại whenever nhập 1 giá trị mới.
//     - Cần đảm bảo rằng luôn cân nhắc giá trị mới nhất và state touched. Bởi vì whenever 1 trong 2 state quản lý thay đổi thì hàm component sẽ bị hiển thị lại.

//  Là trình xử lý sự kiện khi đã có tác động tới input và có thể xác thực tại thời điểm đầu vào 0 còn được focus nữa (điều này được thấy rõ ý nghĩa khi có nhiều đầu vào).
// Việc xác thực lại vẫn ở thời điểm submit hoặc khi blur khỏi đầu vào, Điều này sẽ tuyệt hơn khi user nhập vào 1 dữ liệu hợp lệ và được phản hồi ngay lập tức.

// Use giá trị formIsValid để vô hiệu hóa button khi biểu mẫu chưa được xác thực
