import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
  let i = 0;
  // Truyền dữ liệu từ component con tới component cha
  // Thêm trình xử lý saveExpenseDataHandler();
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      // Lấy dữ liệu từ tham số với toán tử spread
      ...enteredExpenseData,
      id: "e" + i++,
    };
    // console.log(expenseData);
    // Chuyển dữ liệu từ NewExpense sang thành phần cha App
    props.onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
}

export default NewExpense;

// Sử dụng NewExpense bên trong App
