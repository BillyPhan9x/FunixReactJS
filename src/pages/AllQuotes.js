import { useEffect } from "react";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// Nhập useHttp từ file use-http.js trongfolder hooks
import useHttp from "../hooks/use-http";
// Nhập hàm getAllQuotes từ file api.js trong folder lib
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  // gọi hook custom, truyền con trỏ đến hàm, set state là true (kiểm soát việc start state tải => status: đang chờ xử lý ngay từ lúc đầu, 'pending')
  // use destructuring để trích xuất some data từ {}
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  console.log(loadedQuotes, error, status);

  useEffect(() => {
    // gửi y/c khi thành phần tải
    sendRequest(); // gửi y/c whenever thành phần này kết xuất
  }, [sendRequest]);

  //  Xử lý các trạng thái # nhau và kiểm tra trạng thái
  // Điều kiện đang chờ xử lý, đang tải, chờ phản hồi
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  // Điều kiện nếu 0 tải, gặp lỗi
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  // Điều kiện nếu thành công và 0 trích dẫn or trích dẫn trống
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  // Nếu điều kiện 0 có lỗi, 0 tải và có trích dẫn, sẽ kết xuất vs data loadedQuotes
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;

/* ❗ Gửi đi y/c để tìm nạp dữ liệu từ Firebase
- Trong hàm thành phần AllQuotes gọi hook custom useHttp()
-- Truyền vào 1 con trỏ đến getAllQuotes và thiết lập true làm đối số 2 (kiểm soát việc start trạng thái tải => status là đang chờ xử lý ngay từ đầu)
- Lưu vào 1 biến và use destructuring để trích xuất some dữ liệu từ {}
-- sendRequest: hàm để gửi đi y/c
-- status: trạng thái
-- data: gán 1 alias là loadedQuotes (use truy cập vào data đã tải)
-- error: trích xuất lỗi

- Next, cần hook useEffect để gửi y/c khi thành phần tải.
-- gọi hàm sendRequest ( gửi y/c whenever thành phần này kết xuất)
*/

////---- XD bước đầu chưa tương tác vs sever ----- ///////////////
/*
import QuoteList from "../components/quotes/QuoteList";

//  XD dữ liệu giả lập vs mảng chứa nhiều đối tượng
const DUMMY_QUOTES = [
  {
    id: "p1",
    anthor: "Max",
    text: "Learning React is fun!",
  },
  { id: "p2", anthor: "Min", text: "Learning React is great!" },
];

const AllQuotes = () => {
  // Xuất thành phần QuoteList vs prop quotes truyền DUMMY_QUOTES
  return <QuoteList quotes={DUMMY_QUOTES} />
};

export default AllQuotes;
*/
