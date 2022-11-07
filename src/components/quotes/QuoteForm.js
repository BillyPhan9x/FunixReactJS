import { useState, useRef, Fragment } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  // state user bắt đầu nhập dữ liệu or đã start work trên biểu mẫu
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // Thêm xác thực và đặt lại logic - Add validation & Reseting Logic
    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) {
      // hàm cập nhật lỗi
      return alert("Please enter a valid author and text ( non-empty values )");
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  // Thêm 1 listener onClick trên nút gửi biểu mẫu và trỏ vào hàm sẽ để kích hoạt.
  const finishEnteringHandler = () => {
    // để bỏ chặn việc điều hướng sang page #
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    // thiết lập setIsEntering thành true nếu hàm này dc kích hoạt
    setIsEntering(true);
    // console.log("focus");
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are your sure you want to leave? All your entered data will be losst!"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;

/* 📌Lập trình Programmatic (Imperative) Navigation
Ví dụ: Nếu thêm 1 trích dẫn mới và y/c đó gửi đến server, kỳ vòng sau đó dc auto điều hướng khỏi page này và đến trang mong muốn chẳng hạn.

- Giải pháp: - Chuyển đổi nút (button) Add Quote trong QuoteForm thành 1 liên kết (Link) đến trang All Quotes Page.
    -- Nhưng project này 0 cần link mà cần 1 nút gửi biểu mẫu.
    --❗Thay vào đó: cần use điều hướng lập trình.
    ---- Muốn active 1 action navigation và navigation user theo cách lập trình trong code. (tức là user 0 phải nhấn vào link để điều hướng mà chính code của ta sẽ active việc điều hướng khi action gửi dữ liệu dc nhập đến 1 máy chủ đã hoàn thành.)
*/

/* 📌Method trong đối tượng được trả về từ useHistory()
Ví dụ: - Điều gì làm change history pages? 
       - Khi ta thêm 1 page new or chuyển sang 1 page new.
       -- Có thể điều hướng vs method: 
       1. push() sẽ đẩy 1 page new vào chồng page (tức là 1 page new trong history pages)
       2. replace() để thay thế trang hiện tại.
       -- Nhược điểm:
       ---push() là có thể nhấn nút quay lại để trở về page ta đang truy cập.
       ---replace() thì 0 thể quay lại.
*/

/* 📌Ngăn các Route Transition 0 mong muốn vs "Prompt" Component
- Đang nhập văn bản hay anything chưa xong nhưng vô tình active backup page prev or nhấn nút quay lại => bị điều hướng đến nơi # và all state biến mất.
- Anything đang nhập lỡ dở vào biểu mẫu đều bị biến mất.

- Giải pháp: Tại thành phần có form (biểu mẫu) thực hiện 2 việc.
1. Muốn xđ thời điểm user start work vs form. ( props onFocus)
Ví dụ: khi các trường của form dc focus.
2. Hiển thị cảnh báo cho user, nếu họ rời khỏi page sau khi start work trên biểu mẫu đó.(Thành phần Prompt in React Router)
- Prompt cần 2 prop:
 1. when: truyền vào prop này giá trị true or false để xem lời nhắc có nên dc hiển thị 0? (tức là user có change URL hay 0?)
 VD: <Prompt when={isEntering}/>
 2. message: prop này nhận 1 hàm sẽ trả về 1 chuỗi chứa văn bản ta cần hiển thị cho user khi họ rời khỏi trang.

 ❌ Lưu ý: Nếu setIsEntering(false) inside hàm submitFormHandler thì 0 dc vì sẽ hơi muộn. Việc cập nhật state sẽ 0 dc thực hiện trc khi 1 action điều hướng dc kích hoạt Vì action điều hướng sẽ dc active trong onAddQuote. vì đây là 1 quá trình đồng bộ chỉ có 1 hàm.
*/
