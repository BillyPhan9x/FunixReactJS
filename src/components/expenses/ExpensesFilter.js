import "./ExpensesFilter.css";

function ExpensesFilter(props) {
  const selectChangeHandler = (event) => {
    // console.log(event.target.value);
    props.onChangeFilter(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={selectChangeHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
}

export default ExpensesFilter;

// Nó là 1 giá trị dc use in component (như giá trị dc chọn trong menu thả xuống) dc truyền cho component parent thông qua các prop và dc nhận từ component parent.

// - Cả giá trị được thiết lập (value={props.selected}) cũng như hàm xử lý giá trị đã chọn (onChange={selectChangeHandler}) 0 phải là 1 phần của expenses-filter.
// -- expenses-filter chỉ là 1 component biểu diễn url, menu thả xuống và sau đó đính kèm 1 số listener or prop.
// - Loigc thực sự nằm trong component parent => biến expenses-filter thành 1 component đc kiểm soát.
