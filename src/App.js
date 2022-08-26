//  Đường dẫn này cho JS biết ta cần tìm kiếm file ExpenseItem.js trong folder components nằm bên cạnh file App.js đã có câu lệnh import. Sau đó có thể use hàm như 1 element HTML.

import "./App.css";
import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/newexpense/NewExpense";
function App() {
  // Dữ liệu hiển thị trên giao diện là 1 JS Array.
  const expenses = [
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
  // Thêm trình xử lý addExpenseHandler();
  const addExpenseHandler = (expense) => {
    console.log("In App.js");
    console.log(expense);
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
