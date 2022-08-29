// CSS Module
import React from "react";

// import styles or classes . Là 1 tín hiệu đến quy trình biên dịch cơ bản, chuyển đổi sang code để mô-đun CSS hoạt động.
import styles from "./Button.module.css";

// Tham chiếu những style đang nhập từ file CSS. Đó là đối tượng, và mọi class trong file dc xđ là thuộc tính
const Button = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

// Áp dụng CSS Module vào thành phần Button

// Theo mặc định, các Style 0 đc xđ phạm vi
// Xđ phạm vi = Cách tiếp cận đầu tiên là use package(gói) styled component.
// Thêm gói styled component bằng lệnh npm install --save styled-components

// Module CSS sẽ nhận các CSS class và file CSS rồi thay đổi tên các class đó để chúng độc nhất.
// Truy cập các class đó ở dạng thuộc tính trên đối tượng dc tạo kiểu đã nhập. (cách kết nối giữa các tên class đc tạo động)

///////////////////////////////////////////////
//////////////////////////////////////////////
// Styled Component

// import styled from "styled-components";

// // styled.[tagsname]`` đc gọi là attacked template literal.Là 1 tính năng JS mặc định.
// // tagsname là method, styled là đối tượng nhập từ styled-components, trả về 1 thành phần tagsname mới (tạo kiểu)
// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

// export default Button;

// Styled Component là 1 thư viện giúp bạn có thể tổ chức và quản lý code CSS 1 cách dễ dàng trong các project React. Nó được xây dựng với mục tiêu giữ cho các style của các component trong React gắn liền với chính các component đó.

// Styled Component cho phép bạn viết CSS thuần trong các component của mình mà không cần lo lắng về xung đột tên class.

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// import React from "react";

// import "./Button.css";

// const Button = (props) => {
//   return (
//     <button type={props.type} className="button" onClick={props.onClick}>
//       {props.children}
//     </button>
//   );
// };

// export default Button;
