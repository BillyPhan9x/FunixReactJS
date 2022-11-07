import { Fragment } from "react";
// cho phép change history page => cho phép change URL
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// Hàm phụ trợ nhỏ có tác dụng sort 1 mảng quotes theo ID.
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory(); // nhận về 1 {}
  const location = useLocation(); // nhận về 1 {}

  // convert thuộc tính search thành 1 {} JS để dễ use hơn thay vì dùng chuỗi. (tích hợp sẵn vào browse)
  const queryParams = new URLSearchParams(location.search);
  // use queryParams và gọi method get('key') và kiểm tra vs value
  const isSortingAscending = queryParams.get("sort") === "asc";

  // props.quotes: để nhận các quotes thông qua prop, isSortingAscending: thứ tự sắp xếp là 1 boolean
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  // Trong nút thêm 1 listener onClick và active 1 hàm khi nút dc nhấn.
  const changeSortingHandler = () => {
    // Khắc phục code có thể quá dài và cần cải thiện => Vì lý do đó, React Router cho phép ta use 1 mô tả place của đích đến of 1 link, hay điều hướng.
    history.push({
      pathname: location.pathname, // pathname: '/quotes'
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });

    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );

    // code cứng + động
    // history.push("/quotes?sort=" + (isSortingAscending ? "desc" : "asc"));
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes?.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
// kết xuất 1 list 0 có thứ tự (ul) kết xuất 1 loạt các QuoteItem.

//////---- mã code cứng ----//////////////
/*
import { Fragment } from "react";
// cho phép change history page => cho phép change URL
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const history = useHistory(); // nhận về 1 {}
  // console.log("history", history)
  const location = useLocation(); // nhận về 1 {}
  console.log("location", location); // pathname, search

  // convert thuộc tính search thành 1 {} JS để dễ use hơn thay vì dùng chuỗi. (tích hợp sẵn vào browse)
  const queryParams = new URLSearchParams(location.search);
  // use queryParams và gọi method get('key') và kiểm tra vs value
  const isSortingAscending = queryParams.get("sort") === "asc";

  // Trong nút thêm 1 listener onClick và active 1 hàm khi nút dc nhấn.
  const changeSortingHandler = () => {
    // change URL và param query dc add vào
    history.push("/quotes?sort=asc");
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort Ascending</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

// kết xuất 1 list 0 có thứ tự (ul) kết xuất 1 loạt các QuoteItem.
export default QuoteList;
*/

/* 📌Khái niệm param Query
Là param đặc biệt có trong 1 số URL. Nó nằm ở cuối các URL. Trên 1 số URL ta sẽ thấy  số dấu '?' sau đó là params truyền dữ liệu bổ sung vào page đã dc tải.
(00:25) Sự # biệt giữa param Query(truy vấn) & param (route) thông thường
Ví dụ trong project: tham số quoteId.
- Tham số thông thường: bắt buộc
Ví dụ: trang QuoteDetail chỉ dc tải nếu có ID (quoteId)
- Tham số truy vấn: 0 bắt buộc
-- Dấu '?' 0 change việc so khớp route. 
--- 0 ảnh hưởng đến việc đối chiếu xem route nào trùng khớp
--- Nhưng route nào phù hợp cũng đều sẽ có quyền truy cập vào dữ liệu tham số truy vấn.(VD: để change action of page dc tải.

  📌Ý nghĩa của param Query qua ví dụ
- Trên trang Quote List Page, ta muốn triển khai việc sort trích dẫn.
- Giả sử theo thứ tự tăng dần or giảm dần dựa vào ID và time dc add vào.
==> Để làm vậy cần các bước:
1. Thêm chức năng sort trích dẫn. (add logic để sort components)
2. Thiết lập và use params query: để lưu thứ tự sort hiện tại (để có thể chia sẻ 1 link có some param query) 
(user # use link đó thì quotes sẽ auto dc sort như khi ta sort chúng tăng or giảm. Nếu 0 có param query thì quotes sẽ dc sort default)

- 📌useHistory() cho we quyền truy cập vào {} history để change & quản lý URL
- 📌useLocation() cung cấp quyền truy cập đến 1 {} location có infomation về page hiện đang tải và URL hiện đang tải.

❗ Một điều thứ vị là nếu nhấn nút Sort Ascending, sẽ thấy {} location dc log liên tục. Có nghĩa là việc đẩy page sẽ kết xuất thành phần đó. (do đánh giá lại và React Router thấy rằng ta đã change history => kết xuất lại page dc hiển thị ngay cả khi đang ở trang đó. 'cơ chế hữu ích')
*/
