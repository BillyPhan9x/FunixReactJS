// Xử lý sự kiện Cart cần sử dụng useReducer
import { useReducer } from "react";
// Nhập ngữ cảnh giỏ hàng từ cart-context
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//  cần tạo một Reducer để có thể thay đổi các trạng thái của context
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // cần kiểm tra xem món ăn ăn đó đã tồn tại trong items chưa (có phần tử nào trùng id không), nếu có thì hãy câp nhật số lượng tương ứng chứ không phải add thêm một phần tử mới vào items.

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //  Action dùng để xóa đồ ăn có id tương ứng với action.id được truyền vào. Mỗi lần Action này được gọi thì bạn sẽ trừ số lượng của món ăn đó đi 1. Sau đó tính lại totalAmount và cập nhật các State tương ứng vào CartContext.

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // kiểm tra nếu số đơn hàng của mục đó === 1 (true) => lọc ra các id mục # hành động id dc giữ lại
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // Nếu như số lượng của món ăn đó bị giảm về 0. Bạn sẽ cần xóa món ăn đó khỏi items.
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // console.log("cartReducer - existingCartItemIndex", existingCartItemIndex);

    const existingItem = state.items[existingCartItemIndex];
    console.log("cartReducer - existingItem", existingItem);
    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.amount;
    // console.log("cartReducer - updatedTotalAmount", updatedTotalAmount);
    let updatedItems;
    // kiểm tra nếu số đơn hàng của mục đó === 1 (true) => lọc ra các id mục # hành động id dc giữ lại
    if (existingItem.amount > 0) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // Nếu như số lượng của món ăn đó bị giảm về 0. Bạn sẽ cần xóa món ăn đó khỏi items.
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - existingItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount,
    };
  }

  return defaultCartState;
};
//  tạo một  CartProvider để quản lý CartContext
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  // cập nhật hai hàm addItem và removeItem ở CartContext để dispatch được đúng Action tương ứng.
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  //Action ADD  món ăn vào trong State items của CartContext, sau đó tính lại totalAmount của tất cả đồ ăn và cập nhật các State tương ứng vào CartContext. Thông tin của món ăn sẽ nằm ở trường action.item truyền vào.

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    deleteItem: deleteItemFromCartHandler,
  };
  // trả về mã JSX ngữ cảnh giỏ hàng truy cập được cung cấp với thuộc tính: trỏ đến giá trị được lưu ở cartContext
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Mục tiêu của thành phần này là để quản lý bối cảnh hiện tại dữ liệu và cung cấp ngữ cảnh đó cho all các thành phần muốn truy cập vào nó.
