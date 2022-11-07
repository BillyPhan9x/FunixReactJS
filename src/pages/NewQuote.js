import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";

// Nhập useHttp hook từ folder hooks
import useHttp from "../hooks/use-http";
// nhập 1 hàm { addQuote } để gửi y/c từ folder lib trong file api.js
import { addQuote } from "../lib/api";

const NewQuote = () => {
  // Cần gửi y/c để thêm 1 trích dẫn mới.
  // hook custom trả về 1 {}, use destructuring để lấy data (sendRequest là hàm phải gọi để gửi y/c, status là state y/c)
  const { sendRequest, status } = useHttp(addQuote);

  const history = useHistory();

  // cần 1 hook useEffect để xđ 1 hiệu ứng phụ, sẽ dc active whenever giá trị status thay đổi.
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    // gọi hàm sendRequest, truyền đối số quoteData.
    sendRequest(quoteData);
  };

  // Xuất thành phần QuoteForm vs prop onAddQuote truyền vào 1 con trỏ tới hàm xử lý thêm câu trích dẫn
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;

/* 
 ❗Thêm props xđ trạng thái isLoading 
- use status để set prop isLoading trong QuoteForm
-- isLoading là true nếu status === 'pending'
--- pending: cũng là giá trị status # ở file hook custom.
- file QuoteForm có prop isLoading dc use để hiển thị some vòng quay thể hiện việc tải dữ liệu.
*/
