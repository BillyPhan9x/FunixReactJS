import React, { Component } from "react";

import styles from "./User.module.css";

// class User tùy chỉnh kế thừa từ class Component dc xđ bởi React.
class User extends Component {
  // Thêm thành phần sẽ ngắt kết nối
  componentWillUnmount() {
    console.log("User will unmount!");
  }

  render() {
    return <li className={styles.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={styles.user}>{props.name}</li>;
// };

export default User;

// Thành phần User chỉ hiển thị 1 list item với 1 số styling = prop.
// Trong thành phần hàm, nhận prop làm tham số mà React tự động truyền vào.

// Chuyển đổi từ function componnet thành class-based component

// Cần nhập import { Component } from 'react';

// class User {}  // đc tích hợp vào JS. Không phải là 1 khái niệm của React.
// - Bên trong cặp dấu {} có thể thêm các method vào class.
// - Method render() chỉ là 1 method cụ thể mà React kỳ vọng. React sẽ gọi khi nó tìm thấy 1 component nào đó đang dc use trong code JSX. Sau đó React sẽ gọi method render để biết hiển thị gì ra màn hình.
// - Trong method render cần trả về kết quả sẽ hiển thị.

// extends Component cũng là 1 khái niệm dc tích hợp trong JS hiện đại.
// Tạo các class mở rộng các class khác, kế thừa từ các class khác.
// VD: class User tùy chỉnh kế thừa từ class Component dc xđ bởi React.
// thuộc tính prop trong class dc truy cập thông qua từ khóa this

// => Các thành phần dựa trên class có thể hoạt động cùng vs các thành phần hàm.

// Lưu ý: Có thể hiển thị method componentWillUnmount trong thành phần Users. Vì danh sách người dùng dc hiển thị có điều kiện.
// - Vì vậy nó thực sự bị loại bỏ nếu click vào Hide Users.
// console.log("User will unmount!");  // (3) User will unmount!
// -- Bởi vì use thành phần Users 3 lần, cuối cùng hiển thị 3 user => xóa thì cũng 3 user
