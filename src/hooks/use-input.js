import { useState } from "react";

const useInput = (validateValue) => {
  // Use useState() Hook để lấy và cập nhật dữ liệu từ input
  const [enteredValue, setEnteredValue] = useState("");
  // trạng thái để xđ user đã nhập dữ liệu đầu vào hay chưa
  const [isTouched, setIsTouched] = useState(false);

  // Điều kiện xác thực cho đầu vào có hợp lệ không
  const valueIsValid = validateValue(enteredValue);
  // XD đk xác thực đầu vào (hasError) từ hai trạng thái isTouched và valueIsValid
  const hasError = !valueIsValid && isTouched;

  // Hàm xử lý việc thay đổi giá trị đầu vào
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // Hàm xử lý việc đầu vào 0 còn dc focus
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  // Hàm reset (đặt lại các giá trị cần thiết khi đã submit form)
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // hook trả về 1 anything type, nhưng cần trả về nhiều thứ cần {} or arr
  return {
    value: enteredValue, // giá trị
    isValid: valueIsValid, // giá trị có hợp lệ 0?
    hasError, // chứa kết quả dc lưu trữ, use syntax JS hiện đại key=value
    valueChangeHandler, // giá trị thay đổi
    inputBlurHandler, // đầu vào 0 còn focus
    reset, // reset đầu vào
  };
};

export default useInput;

//  Sự trùng lặp code trong quá trình xác thực đầu vào biểu mẫu
//  Cách tiếp cận # để xác thực đầu vào biểu mẫu là tự XD 1 Hook để tái use logic

// - Inside hàm useInput hook:
//   - Muốn xử lý giá trị của 1 đầu vào nhất định - touched state.
//   - Muốn suy ra validity của nó, tất nhiên cũng kết hợp vs touched state.
//   - hook custom phải linh hoạt.
//   - Logic xác thực cụ thể sẽ dc truyền vào hook từ outside, nhưng đó là thứ có thể tạo dựng.

// Logic xác thực 0 nên mã hóa cứng  (XD hook custom)
// - Logic trong Hook useInput() phải là logic chung nhất để có thể use lại. Logic đó 0 phải dành cho 1 đầu vào cụ thể.
// Giải pháp: có thể kỳ vọng 1 hàm làm đối số cho hàm custom hook này.
// - Giả sử có hàm validateValue làm tham số cho hàm useInput.
// - Tham số này nhận 1 hàm làm giá trị.
// - Vì vậy, với valueIsValid gán hàm có thể thực thi validateValue và chỉ cần truyền enteredValue hiện đang có.

// Các hàm xử lý việc change, focus được XD trong Hook để khi use tại các thành phần ta có thể gọi hàm từ Hook đó.
