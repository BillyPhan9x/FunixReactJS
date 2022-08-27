// Cần nhập useState. Hàm dc cấp bởi thư viện React, hàm cho phép xác định các value is state vs những thay đổi các giá trị này sẽ phản ánh trong hàm thành phần đang dc gọi lại.
import React from "react";

import Card from "../UI/Card";
// Use component ExpenseDate trong copmponent ExpenseItem (file ExpenseItem)
import ExpenseDate from "./ExpenseDate";
// Use CSS cho component bằng cú pháp import cho React biết nó cần xem xét file ExpenseItem.css.
import "./ExpenseItem.css";

// 👉 Nhận props là tham số, truyền props để định dạng và trích xuất
function ExpenseItem(props) {
  // syntax use dữ liệu động trong JSX // trong ExpensexItem, khi use ExpenseDate, nên thiết lập prop date và giá trị truyền vào sẽ chỉ {props.date}
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;

// Để use Component ExpenseItem, cần export(xuất) nó, nếu 0 nó chỉ có thể use đc bên trong file
// Xuất hàm là mặc định cho file này.

// IDE (Integrated Development Environment) môi trường tích hợp dùng để viết code để phát triển UD. Đang báo lỗi, có vấn đề khó đọc

// Nguyên tắc build Component – chỉ trả về 1 khối mã JSX duy nhất

// Các component tùy chỉnh phải start = kí tự viết hoa khi đang use code DOM JSX để React có thể nhận biết component tùy chỉnh.

///////////////////////////////////////////

/* <div className="expense-item">
  <div>March 28th 2011</div>
  <div className="expense-item__description">
    <h2>Car Insurance</h2>
    <div className="expense-item__price">$294.67</div>
  </div>
</div>; */
