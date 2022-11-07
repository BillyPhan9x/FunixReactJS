// import React, { useState } from "react";
import { Component } from "react";

import User from "./User";

import styles from "./Users.module.css";

// class Users tùy chỉnh kế thừa từ class Component dc xđ bởi React.
class Users extends Component {
  // Xác định state và các thành phần dựa trên class, cần use hàm tạo. Hàm tạo sẽ tự động dc gọi bất cứ khi nào (mệnh đề) class  User dc khởi tạo.
  constructor() {
    // Gọi hàm tạo của supper class là class dc kế thừa.
    super();
    // Thực hiện công việc khởi tạo như khởi tạo state( function component).
    // Thực hiện = cách truy cập vs từ khóa this.state và đặt thành 1 đối tượng. (luôn luôn)
    this.state = {
      showUsers: true,
      // moreState: 'Test', 1 thuộc tính bổ sung.
      // nested: {}, 1 đối tượng lồng nhau
      // data: [],    state erased(bị xóa)
    };
  }

  // Thêm phương thức của chu kỳ- componentDidUpdate
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  // Hàm xử lý nút kích hoạt khi state thay đổi
  toggleUserHandler() {
    // Gọi method đặc biệt setState, 0 ghi đè state cũ (React sẽ ngầm hợp nhất đối tượng truyền vào vs state hiện có.) Trả về 1 đối tượng mới.
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }
  render() {
    // Xđ hằng số trợ giúp ( đặt logic ở ngoài code JSX) 0 method render
    // users dc truyền thông qua các prop vào thành phần user.
    const userList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={styles.users}>
        <button onClick={this.toggleUserHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && userList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUserHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const userList = (
//     <ul>
//       {DUMMY_USERS.map((user) => {
//         <User key={user.id} name={user.name} />;
//       })}
//     </ul>
//   );

//   return (
//     <div className={styles.users}>
//       <button onClick={toggleUserHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && userList}
//     </div>
//   );
// };

export default Users;

// Thành phần User vs 1 số User giả. Có hàm toggleUserHandler. Và tạo danh sách User lưu trữ bởi 1 biến hằng số = cách sao chép thành phần User. Có nút kích hoạt hàm đó khi thay đổi state với useState, kiểm soát việc danh sách User có đc hiển thị hay ko.
// - state và trỏ vào 1 hàm sẽ dc thực thi khi nút dc click.

// Chuyển đổi từ function componnet thành class-based component

// Cần nhập import { Component } from 'react';
// Trong method render cần trả về code JSX sẽ dc hiển thị.
// Nhóm chức năng lại với nhau = cách nhóm tất cả trong class đó.
// Quản lý state cần 2 làm điều: khởi tạo và xác định state.

// Lưu ý: Không thêm 1 hàm bên trong method render (có thể dc) nhưng ở đây 0 sẽ 0 hoạt động chính xác.
// Trc React 16.8 class-based component là loại thành phần duy nhất có thể quản lý state.
// Để đảm bảo từ khóa this bên trong phương thức đề cập đến class xung quanh (0 làm theo mặc định) => Khắc phục: => .bind(this)

/////////////////////////////////////////////////
// componentDidUpdate() {
//   if (this.props.users.length === 0) {
//     throw new Error("No users provided!");
//   }
// }

// Thêm phương thức của chu kỳ- componentDidUpdate, trong đó kiểm tra this.props.users nhận dc là 1 mảng users có độ dài = 0 (0 có người dùng). Và ném 1 lỗi mới (liên quan đến kỹ thuật trong JS).
// => Đang tạo ra 1 lỗi => Để lỗi này nổi lên call stack. Vì vậy, cần truyền nó qua tất cả các thành phần.
// - Nếu nó 0 dc xử lý ở bất kỳ đâu => UD sẽ bị hỏng (báo lỗi ở console dev tool)
