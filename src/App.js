//  Đường dẫn này cho JS biết ta cần tìm kiếm file ExpenseItem.js trong folder components nằm bên cạnh file App.js đã có câu lệnh import. Sau đó có thể use hàm như 1 element HTML.

import React, { useState } from "react";

import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/newexpense/NewExpense";
import "./App.css";

const SUP_EXPENSE = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(SUP_EXPENSE);
  // Dữ liệu hiển thị trên giao diện là 1 JS Array.

  // Hàm addExpenseHandler() đc kích hoạt any khi nào 1 khoản chi mới dc thêm vào. Nhận expense làm tham số trong hàm.
  const addExpenseHandler = (expense) => {
    // Quản lý State bằng trạng thái trước đó, cập nhật state khi state new dựa trên snapshot cũ of chính state đó.
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;

//  Xuất hàm để làm cho hàm có thể tái use bên ngoài file = cách use câu lệnh export.

/////////////////////////////////////////////////
/////////////////////////////////////////////////
