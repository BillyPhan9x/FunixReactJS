import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// Xuất hàm tìm nạp dữ liệu giỏ hàng lần đầu tiên
export const fetchCartData = () => {
  // hàm  lồng nhau không đồng bộ, use API tìm nạp
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-73bf6-default-rtdb.firebaseio.com//cart.json"
      );

      // kiểm tra xem phản hồi có thể 0 ổn vì lý do gì 0?
      if (!response.ok) {
        // Nếu đúng, thì ném lỗi '0 thể tìm nạp dữ liệu giỏ hàng
        throw new Error("could not fetch cart data!");
      }
      // lưu dữ liêu, kết quả của việc gọi phản hồi chờ đợi vs .json
      const data = await response.json();
      // Nếu vượt qua (có kết quả của việc phản hồi) thì trả lại nó (dữ liệu)
      return data;
    };
    // try catch, thử thực thi và bắt bất kỳ lỗi nào gặp phải.
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      // Dòng code phía dưới sẽ gặp lỗi find 'undefine' vì nếu Firebase ban đầu dữ liệu trống  => sửa lại chính xác dòng trên
      // dispatch(cartActions.replaceCart(cartData));
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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }), // JSON.stringify(cart) all state of cart,
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
