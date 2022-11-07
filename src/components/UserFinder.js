import { Fragment, Component } from "react";

import Users from "./Users";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

import styles from "./UserFinder.module.css";

class UserFinder extends Component {
  // Chỉ có thể kết nối 1 component dựa trên class với 1 context.
  static contextType = UsersContext;
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      filteredUsers: [], // Giả sử filteredUsers: [],
    };
  }

  // Giả sử DUMMY_USERS đã dc tải từ sever, từ cơ sở dữ liệu. => đang gửi HTTP request.
  // Cần tìm nạp người người dùng (componentDidMount sẽ chỉ chạy 1 lần) khi thành phần UserFinder (ban đầu) dc hiển thị lần đầu tiên.
  // Nếu sau đó nó dc cập nhật, componentDidMount sẽ 0 thực thi mà componentDidUpdate sẽ chạy.
  componentDidMount() {
    // Send http request .....
    this.setState({ filteredUsers: this.context.users });
  }

  // Cần kiểm tra state có thay đổi hay 0? Trường hợp searchTerm đã thay đổi.
  // Nhận 2 đối số: prevProps(prop trước đó) và prevState(state snapshot trc khi cập nhật thành phàn hiện tại.)
  componentDidUpdate(prevProps, prevState) {
    // Kiểm tra xem prevState.SearchTerm vs searchTerm là khác nhau thì mới thực hiện logic. (ngăn chặn vòng lặp vô hạn)
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={styles.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;

//////////////////////////////////////////////////////////

// import { Fragment, useState, useEffect } from "react";

// import Users from "./Users";

// import styles from "./UserFinder.module.css";

// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

// sử dụng đối tượng event để đọc giá trị do người dùng nhập
//   const searchChangeHandler = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={styles.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

// export default UserFinder;

// Thành phần hàm sử dụng nhiều state slice, useEffect để quản lý và lọc người dùng và truyền những người dùng đã được lọc sang thành phần Users.
