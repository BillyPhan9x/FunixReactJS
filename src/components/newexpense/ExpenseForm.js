import React, { useState } from "react";

import "./ExpenseForm.css";

// Tạo thành phần ExpenseForm và sử dụng CSS cho thành phần
function ExpenseForm(props) {
  // Lấy dữ liệu form, lưu thành 1 Object.
  // Hằng số, use destructuring để có 2 ptử [giá trị ban đầu, hàm cập nhật]

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //  Xây dựng hàm xử lý sự kiện onInput
  const titleInputHandler = (event) => {
    // đối tượng event, phần tử DOM, giá trị đầu vào(chuỗi) lưu trữ trong state
    // console.log(event.target.value);
    setEnteredTitle(event.target.value);
  };
  //  Đảm bảo lưu trữ in some biến, tách rời với vòng đời of hàm component đó.
  const amountInputHandler = (event) => {
    // console.log(event.target.value);
    setEnteredAmount(event.target.value);
  };
  const dateInputHandler = (event) => {
    // console.log(event.target.value);
    setEnteredDate(event.target.value);
  };

  // Xử lý click gửi form
  const clickHandler = (event) => {
    // Tắt hành vi mặc định khi submit form là tải lại trang
    event.preventDefault();
    // console.log("Clicked!");

    // Tạo một object chứa các trạng thái mới nhất của input
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    // console.log(expenseData);

    // Chạy hàm thông qua props (giao tiếp giữa 2 thành phần)
    props.onSaveExpenseData(expenseData);

    // Ràng buộc hai chiều - Two-Way Binding
    // Đặt lại trạng thái các input sau khi submit form
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            // Thêm thuộc tính(mặc định) value vào thẻ input để tạo ràng buộc hai chiều
            value={enteredTitle}
            onInput={titleInputHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input // thẻ input tự đóng, kiểm soát giá trị thay đổi
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            // sự kiện onInput trên input
            onInput={amountInputHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-30"
            value={enteredDate}
            onInput={dateInputHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" onClick={clickHandler}>
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;

// Sử dụng ExpenseForm bên trong NewExpense
