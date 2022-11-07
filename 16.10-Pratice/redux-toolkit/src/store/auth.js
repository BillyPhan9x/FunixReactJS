import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };

// lữu trữ slice trong biến const authSlice
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  // đăng ký reducers là methods reducer có thể change state
  reducers: {
    // method để đăng nhập user
    login(state) {
      state.isAuthenticated = true;
    },
    // method để đăng xuất user
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// Xuất các hành động để có thể use từ thành phần #
export const authActions = authSlice.actions;

export default authSlice.reducer;
