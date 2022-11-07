import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

// const store = createStore(counterSlice.reducer);
// Gọi phương thức có sẵn của redux để tạo 1 store mới và lưu trữ store trong hằng số store.
// Làm việc với nhiều Slice
// Vì vậy, có thể gọi configureStore 1 lần (0 thay đổi và chỉ có 1 reducer gốc)
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
// All những reducer riêng lẻ trên sau đó sẽ auto dc hợp nhất vs nhau thành 1 reducer chính dc hiển thị vs store. Đó là cách kết hợp nhiều slice và các reducer của chúng.
// xuất mặc định store để có thể sử dụng nó bên ngoài file index.js này.
export default store;
