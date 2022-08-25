//  Đường dẫn này cho JS biết ta cần tìm kiếm file ExpenseItem.js trong folder components nằm bên cạnh file App.js đã có câu lệnh import. Sau đó có thể use hàm như 1 element HTML.

import "./App.css";
import Expenses from "./components/Expenses";
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
  return (
    <div>
      <h1>Let's get started</h1>
      <Expenses items={expenses} />
    </div>
  );
}

export default App;

//  Xuất hàm để làm cho hàm có thể tái use bên ngoài file = cách use câu lệnh export.

/////////////////////////////////////////////////
//////////////////////////////////////////////////
// .card {
//   border-radius: 12px;
//   box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
// }

// import "./Card.css";

// function Card(props) {
//   const classes = "card " + props.className;

//   return <div className={classes}>{props.children}</div>;
// }

// export default Card;
