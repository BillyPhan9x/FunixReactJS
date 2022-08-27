import React, { useState } from "react";
import Card from "../UI/Card";

// Use component ExpenseItem trong copmponent Expenses (file ExpenseItem) thành phần được kiểm soát
import ExpenseItem from "./ExpenseItem";

import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

function Expenses(props) {
  // Controlled Component ExpensesFilter
  const [filteredYear, setFilteredYear] = useState("");

  // Để thay đổi giá trị cho State của Expenses từ Component con ExpensesFilter. Cần  truyền qua 1 Props của ExpensesFilter là 1 hàm, hàm này sẽ thực hiện việc update State.
  const filterChangeHandler = (selectYear) => {
    setFilteredYear(selectYear);
  };
  // chức năng render danh sách các phần tử theo như Filter (năm) đã chọn.
  // Tạo biến lưu giá trị filter để lọc ra các Item trong expense mà có năm thỏa mãn.

  const filteredExpenses = props.items.filter(
    // Để lấy được giá trị năm từ một Javascript Date, cần use hàm getFullYear()
    (expense) => expense.date.getFullYear().toString() === filteredYear
  );
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />

        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
}

export default Expenses;

//  Xuất hàm để làm cho hàm có thể tái use bên ngoài file = cách use câu lệnh export.

// chuyển đổi mảng các đối tượng của mình thành 1 mảng các ExpenseItem và nó sẽ dc hiển thị bởi React.

// Nếu các ExpenseItem là các item sateful và có state được quản lý. Sau đó, nếu item first có 1 state nhất định, thì khi thêm 1 item mới, item first-old sẽ bị ghi đè = item first-new.
// Cho React biết nơi 1 mục mới được thêm vào vs từ khóa “key”
// Nếu thêm prop key vào 1 component or element HTML, I can giúp React xác định các iiem riêng lẻ.
