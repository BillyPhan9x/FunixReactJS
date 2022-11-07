import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// gọi createSlice, hàm createSlice nhận 1 đối tượng làm đối số.
// Với createSlice, cần chuẩn bị 1 slice trạng thái toàn cục. Khi có những trạng thái # nhau, 0 liên quan trực tiếp đến nhau.
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  // reducers là 1 đối tượng, cũng có thể nói là 1 ánh xạ gồm all các reducer mà slice cần.
  // Thêm các phương thức cho đối tượng reducer, sẽ tự động nhận dc trạng thái mới nhất.
  reducers: {
    increment(state) {
      state.counter++;
    },
    // cần 1 số dữ liệu bổ sung dc gắn vs action, thì add param action và use nó trong hàm reducer.
    increase(state, action) {
      state.counter = state.counter + action.payload;
      // payload là tên thuộc tính chứa any dữ liệu bổ sung nào mà bạn có thể gửi đi.
    },
    decrement(state) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter; // để đảo ngc giá trị.
    },
  },
});

// Xuất các hành động để có thể use từ thành phần #
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
