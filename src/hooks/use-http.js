import { useState, useCallback } from "react";

// Để làm cho hook trở nên linh hoạt hơn, cần truyền 1 số tham số cho hàm useHttp()
// - Tham số thứ nhất định cấu hình tùy chỉnh
const useHttp = () => {
  // Xác định logic chung
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Đặt tên cho chức năng chung là sendRequest vì ko chỉ muốn ở mức tìm nạp dữ liệu mà còn có thể gửi any loại y/c nào đến bất kỳ loại URL nào và thực hiện bất kỳ loại chuyển đổi dữ liệu nào.
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Loại bỏ url là chuỗi code cứng đang dc use để fetch('...'). Thay vào đó, tham chiếu đến requestConfig.url.
      // Hook này có thể use dc cho các y/c POST =>fetch() cần nhận đối số thứ 2 là 1 đối tượng có chứa thuộc tính.
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        // Nếu thỏa mãn điều kiện => ném ra lỗi
        throw new Error("Request failed!");
      }

      // Luôn làm việc vs dữ liệu có định dạng JSON
      const data = await response.json();
      //   console.log(data);

      // Chuyển dữ liệu vs tham số thứ hai trong Hook
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  // Giá trị trả về của Hook là 1 đối tượng
  // Do use tên thuộc tính và tên biến (giá trị lưu trữ) (key = value) nên có thể use 1 lối tắt JS hiện đại mà vẫn cùng 1 kết quả.
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

// - Truyền vào tham số requestConfig (sẽ phải là 1 đối tượng chứa URL và anytype config nào # có thể cần thiết)
// Do ta gọi hook useHttp() nên cần truyền vào 1 đối tượng có thuộc tính URL để lưu trữ URL.

// Để hook custom trở nên linh hoạt hơn và 0 buộc tất cả các thành phần phải truyền vào 1 số dữ liệu giả lập=> cần điều chỉnh cấu hình cho fetch().
// - Với method, cần kiểm tra xem requestConfig.method đã dc thiết lập chưa, và chỉ khi đã dc thiết lập thì mới áp dụng requestConfig.method, còn nếu 0 thì thiết lập "GET" làm mặc định.
// - Với headers, cần kiểm tra xem requestConfig.headers đã dc provide chưa, nếu rồi thì áp dụng requestConfig.headers, nếu 0 thì nhập {} để thiết lập headers là 1 đối tượng trống.
// - Với body: cần kiểm tra xem requestConfig.body đã dc thiết lập chưa, nếu đã dc thiết lập thì nhập JSON.stringify(requestConfig.body), nếu chưa thì thiết lập giá trị null.

// Đã đưa data cho hàm applyData xử lý, bản thân hàm này và những gì xảy ra trong nó sẽ dc provide bởi component use hook useHttp() tùy chỉnh.
// => Vừa có đc khả năng tái use logic trong hook, lại vừa cho phép các bước cụ thể cần dc thực hiện vs data nằm trong components use hook.

// 📌=> Những thứ dc thiết lập trong hook useHttp() custom suy cho cùng sẽ phải khả dụng vs components use hook custom.
// - Những thành phần đó phải có quyền truy cập và các state, các hàm để chính component có thể kích hoạt bất kỳ 1 việc nào đó.

// 📌 useCallback() cũng nhận 1 mảng phụ thuộc và mảng phải bao gồm mọi thứ đang dc use (đối tượng requestConfig, hàm applyData).
// 0 cần phải thêm requestConfig và applyData làm phụ thuộc trong mảng. Vì giờ nó đã là 1 tham số của hàm sendRequest dc bao bọc bởi useCallback() rồi, 0 còn là 1 dependency outside nữa.
