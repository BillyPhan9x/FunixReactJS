// Xây dựng component ExpenseDate từ component ExpenseItem
// 👉 Nhận props là tham số
// truyền props để định dạng và trích xuất

import React from "react";

import "./ExpenseDate.css";

// Use props truyền dữ liệu động cho component
function ExpenseDate(props) {
  // Build giao diện hiển thị ngày, tháng, năm (logic bên ngoài, biến trong thành phần JSX)
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}
// Để use Component ExpenseItem, cần export(xuất) nó, nếu 0 nó chỉ có thể use đc bên trong file
// Xuất hàm là mặc định cho file này.
export default ExpenseDate;

// <div>{props.date.toLocaleString("en-US", { month: "long" })}</div>
// <div>{props.date.toLocaleString("en-US", { day: "2-digit" })}</div>
// <div>{props.date.getFullYear()}</div>
