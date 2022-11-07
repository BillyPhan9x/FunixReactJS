import React from "react";
// khởi tạo ngữ cảnh này với một số dữ liệu mặc định
// Để quản lý danh sách các món ăn đã được thêm vào giỏ hàng, bạn sẽ tạo một Context mới là CartContext, Context này sẽ gồm các thuộc tính như sau:
const CartContext = React.createContext({
  items: [], // một mảng các mặt hàng để quản lý 1 số mặt hàng trong giỏ hàng.
  totalAmount: 0, // tổng số tiền bàn đầu sẽ = 0.
  addItem: (item) => {}, // chức năng addItem cho phép cập nhật ngữ cảnh , giả sử nhận dc mục cần thêm vào
  removeItem: (id) => {}, // chức năng removeItem cho phép cập nhật ngữ cảnh, giả sử 1 id để xđ mặt hàng cần loại bỏ khỏi giỏ hàng.
  deleteItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;

// có hai chức năng (addItem và removeItem cho phép cập nhật ngữ cảnh đó.
