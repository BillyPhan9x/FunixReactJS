import React from "react";

import ExpenseItem from "./ExpenseItem";

import "./ExpensesList.css";

// Hàm thành phần danh sách khoản chi
function ExpensesList(props) {
  // Câu lệnh return có điều kiện
  if (props.items.length === 0) {
    // Nếu 0 có item nào thì sẽ phải trả về 1 đoạn code JSX hoàn toàn khác.
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  // Trả về trả 1 JSX với list 0 thứ tự với class Và trong ul trả về phương thức map() tức là mảng expenses để kết xuất.
  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
      ;
    </ul>
  );
}

export default ExpensesList;
