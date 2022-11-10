import { createSlice } from "@reduxjs/toolkit";
// import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false, // thay đổi thì mới y/c PUT, ko thì ko y/c lần đầu
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFormCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

/*
// // inside the action creators (Thunk) 42-96 (có thể tách ra khi logic dài, sang file cart-actions.js)
// Tạo 1 hàm, gửi dữ liệu giỏ hàng, ngay lập tức
export const sendCartData = (cart) => {
  // trả về 1 hàm # (0 đồng bộ)
  return async (dispatch) => {
    // gửi 1 thông báo, hành động
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    // Tạo 1 hàm mới (0 đồng bộ)  hàm lồng ghép
    const sendRequest = async () => {
      // gửi y/c
      const response = await fetch(
        "https://react-http-73bf6-default-rtdb.firebaseio.com//cart.json",
        {
          method: "PUT", // ghi đè
          body: JSON.stringify(cart),
        }
      );

      // kiểm tra tình trạng gửi y/c
      if (!response.ok) {
        throw new Error("Send cart data failed.");
      }
      // const responseData = response.json();
    };
    try {
      // try catch để thử và xử lý bất kỳ lỗi nào.
      // gọi hàm, async/await
      await sendRequest();

      // Nếu 0 có lỗi, gửi 1 thông báo, hành động thành công.
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // Nếu gặp lỗi gửi 1 thông báo, hành động lỗi.
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sent cart data failed!",
        })
      );
    }
  };
};
*/

export const cartActions = cartSlice.actions;

export default cartSlice;

/*
/// ---- Trong reducers thêm 1 method mới thay thế giỏ hàng. Các thao tác được thực hiện ở components---- ////
// Không phải là cách tốt nhất, lúc nào Redux 0 còn làm việc hiệu quả nữa, mà chỉ là 1 phần 

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFormCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
*/
