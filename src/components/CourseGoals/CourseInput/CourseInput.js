// CSS Module: module hoá stylesheet thành các file CSS nhỏ và scoped locally to the component.
import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  // quản lý bởi State (isValid)
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    // Xác định điều kiện đảm bảo có nội dung trong inputs.
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // Xác định điều kiện đảm bảo có nội dung trong inputs.
    if (enteredValue.trim().length === 0) {
      // Gửi phản hồi tới user = style động và quản lý bởi State (isValid)
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

// use CSS Module cho thành phần CourseInput
// Tất cả class name, selectors, animations trong css modules files sẽ chỉ hợp lệ ở component import nó và không ảnh hưởng tới các thành phần khác trong website.

// Nếu isValid true => false vì nó 0 hợp lệ.
// Nếu isValid false => true vì invalid là true nếu isValid 0 đúng.
// Vì vậy, đặt invalid thành true nếu những gì user nhập 0 hợp lệ.

//////////////////////////////////////////////////////////////
// Styled Component & Dynamic Props

// import React, { useState } from "react";

// import Button from "../../UI/Button/Button";

// import styled from "styled-components";

// // use styled component cho thẻ div(FormControl)
// // & tham chiếu trở lại thành phần đang dc tạo.
// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "#8b005d")};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     background: ${(props) => (props.invalid ? "#ffd7d7" : "transparent")}
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;

// const CourseInput = (props) => {
//   const [enteredValue, setEnteredValue] = useState("");
//   // quản lý bởi State (isValid)
//   const [isValid, setIsValid] = useState(true);

//   const goalInputChangeHandler = (event) => {
//     // Xác định điều kiện đảm bảo có nội dung trong inputs.
//     if (event.target.value.trim().length > 0) {
//       // Reset style, Đặt State isValid thành true khi người dùng nhập vào inputs
//       setIsValid(true);
//     }
//     setEnteredValue(event.target.value);
//   };

//   const formSubmitHandler = (event) => {
//     event.preventDefault();
//     // Xác định điều kiện đảm bảo có nội dung trong inputs.
//     if (enteredValue.trim().length === 0) {
//       // Gửi phản hồi tới user = style động và quản lý bởi State (isValid)
//       setIsValid(false);
//       return;
//     }
//     props.onAddGoal(enteredValue);
//   };

//   // Kiểm soát style động với props trong đoạn mã JSX
//   // Thêm style động vào input trong FormControl via props
//   return (
//     <form onSubmit={formSubmitHandler}>
//       <FormControl invalid={!isValid}>
//         <label>Course Goal</label>
//         <input type="text" onChange={goalInputChangeHandler} />
//       </FormControl>
//       <Button type="submit">Add Goal</Button>
//     </form>
//   );
// };

// export default CourseInput;

///////////////////////////////////////////////////////////
// Style CSS Golbal

// import React, { useState } from "react";

// import Button from "../../UI/Button/Button";

// import "./CourseInput.css";

// const CourseInput = (props) => {
//   const [enteredValue, setEnteredValue] = useState("");
//   // quản lý bởi State (isValid)
//   const [isValid, setIsValid] = useState(true);

//   const goalInputChangeHandler = (event) => {
//     // Xác định điều kiện đảm bảo có nội dung trong inputs.
//     if (event.target.value.trim().length > 0) {
//       // Reset style, Đặt State isValid thành true khi người dùng nhập vào inputs
//       setIsValid(true);
//     }
//     setEnteredValue(event.target.value);
//   };

//   const formSubmitHandler = (event) => {
//     event.preventDefault();
//     // Xác định điều kiện đảm bảo có nội dung trong inputs.
//     if (enteredValue.trim().length === 0) {
//       // Gửi phản hồi tới user = style động và quản lý bởi State (isValid)
//       setIsValid(false);
//       return;
//     }
//     props.onAddGoal(enteredValue);
//   };

//   // Thêm class động với syntax Template String trong ES6

//   return (
//     <form onSubmit={formSubmitHandler}>
//       <div className={`form-control ${!isValid ? "invalid" : ""}`}>
//         <label>Course Goal</label>
//         <input type="text" onChange={goalInputChangeHandler} />
//       </div>
//       <Button type="submit">Add Goal</Button>
//     </form>
//   );
// };

// export default CourseInput;
