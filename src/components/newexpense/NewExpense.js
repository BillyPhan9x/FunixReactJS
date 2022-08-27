import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

function NewExpense(props) {
  const [isEditting, setIsEditing] = useState(false);

  // Truyền dữ liệu từ component con tới component cha
  // Thêm trình xử lý saveExpenseDataHandler();
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      // Lấy dữ liệu từ tham số với toán tử spread
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(expenseData);
    // Chuyển dữ liệu từ NewExpense sang thành phần cha App
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHander = () => {
    setIsEditing(true);
  };

  const stopEditingHander = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditting && (
        <button onClick={startEditingHander}>Add New Expense</button>
      )}
      {isEditting && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHander}
        />
      )}
    </div>
  );
}

export default NewExpense;

// Sử dụng NewExpense bên trong App
