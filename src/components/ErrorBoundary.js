import { Component } from "react";

import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  componentDidCatch(error) {
    console.log(error);
    // / Khi gặp lỗi thì cập nhật lại state
    this.setState({ hasError: true });
  }
  render() {
    // Kiểm tra xem state có lỗi ko? Nếu có thì trả về 1 đoạn paragraph
    if (this.state.hasError) {
      return <p className={styles.error}>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// Phương thức chu kỳ componentDidCatch có thể thêm vào bất kỳ thành phần dựa trên class nào => khi thêm nào  => thì class đó trở thành Error Boundary.

// Phương thức chu kỳ componentDidCatch sẽ kích hoạt whenever 1 trong componnets children gặp lỗi or tạo ra 1 lỗi.

// Trả về this.props.children bởi vì muốn gói thành phần ErrorBoundary xung quanh các thành phần mà cần dc bảo vệ bởi thành phần đó.

// Đối tượng error sẽ dc React tự động truyền vào dưới dạng tham số, xem xét lỗi đó để tìm ra lỗi. Có thể chạy logic khác nhau dựa trên mỗi các lỗi khác nhau. (có thể cân nhắc việc tạo các Error Boundary khác nhau cho các lỗi khác nhau.)

// Bởi vì đây là 1 thành phần dựa trên class thông thường. Có thể thêm 1 hàm tạo, gọi supper, sau đó đặt state thành hasError : false chẳng hạn.
