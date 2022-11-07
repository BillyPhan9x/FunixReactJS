import { useEffect } from "react";
import { useParams } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();

  const { quoteId } = params;

  // gọi hook custom, truyền con trỏ đến hàm, set state là true, use destructuring để trích xuất some data từ {}
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    // Hàm getSingleQuote có 1 đối số quoteId (cần biết đang tìm nạp dữ liệu cho trích xuất nào), use useParams nên đã có quyền truy cập vào params nên có thể use destructuring để lấy mỗi dữ liệu cần thiết để truyền phụ thuộc vào useEffect hợp lý hơn.
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //  Xử lý lại các trạng thái và kiểm tra trạng thá
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
    return <p className="centered">{error}</p>;
  }

  // Điều kiện nếu 0 có loadedQuote, 0 tìm thấy câu trích dẫn,
  // loadedQuote trả về 1 đối tượng dc set nên sẽ 0 ổn
  if (!loadedQuote.text) {
    return <p className="centered">No quote Found!</p>;
  }

  // kết xuất thành phần HighlightedQuote vs 2 prop text, anthor truyền {} có id tương ứng đã dc xd
  return (
    <HighlightedQuote text={loadedQuote.text} anthor={loadedQuote.author} />
  );
  /* <Route path={`/quotes/${params.quoteId}`} exact>
  <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
  <Route path={`/quotes/${params.quoteId}/comments`}>*/
};

export default QuoteDetail;

/*
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const DUMMY_QUOTES = [
  {
    id: "p1",
    anthor: "Max",
    text: "Learning React is fun!",
  },
  { id: "p2", anthor: "Min", text: "Learning React is great!" },
];

const QuoteDetail = () => {
  const params = useParams();

  const match = useRouteMatch(); // nhận 1 {}
  console.log("match", match);

  // xđ trích dẫn cần kết xuất ra màn hình.
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    // Nếu 0 có trích dẫn, cần hiển thị 1 nội dung dự phòng.
    return <p>No quote found!</p>;
  }

  // kết xuất thành phần HighlightedQuote vs 2 prop text, anthor truyền {} có id tương ứng đã dc xd
  return (
    <section>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote text={quote.text} anthor={quote.anthorauthor} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
  // <Route path={`/quotes/${params.quoteId}`} exact>
  // <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
  // <Route path={`/quotes/${params.quoteId}/comments`}>
};

export default QuoteDetail;*/

// Tham số URL (Params) là các tham số có giá trị được đặt động trong URL của trang. Điều này cho phép 1 tuyến hiển thị cùng 1 thành phần (UI) trong khi chuyển thành phần đó thành phần động của URL để nó có thể thay đổi dựa trên đó.
// VD: <Route path="/:handle">
//         <Profile />
//     </Route>

// Lưu ý: Có dấu “:” trong đường dẫn, ở phía trước Params. Đó là bởi vì nó động. Thay vì khớp theo nghĩa đen, nó khớp cho 1 mẫu cụ thể. Với UD này, bất cứ khi nào ai đó truy cập 1 tuyến đường phù hợp với mẫu đó (/dan_funix, /tom_bn, hay /use_name), thành phần <Profile /> sẽ được hiển thị.

// Vậy làm cách nào để we truy cập phần động của URL (trong trường hợp này là xử lý) từ thành phần được hiển thị? Kể từ React Router v5.1, React Router đi kèm với 1 Hook tùy chỉnh giúp we thực hiện điều này là Hook useParams(). useParams trả về 1 đối tượng có ánh xạ giữa tham số URL (Params) và giá trị của nó.

// --- Trích xuất Route Params --- //
//  Cần truy cập được giá trị động cụ thể được nhập vào URL
//  Giá trị của params.ProductID

/* 📌Sáng tạo vs các route lồng nhau
❗use thành phần Link tạo đường dẫn tới comment
- Cần XD path dynamic vì quoteId dynamic, nó phụ thuộc vào trích dẫn dc tải.
=> Sau khi có dc liên kết Load Comments. Và khi đi đến 1 trích dẫn mà 0 có /comments, vẫn có thể nhấn Load Comments để đến dc phần bình luận. Nhưng cũng nên làm cho liên kết đó biến mất sau khi đã tải dc bình luận.

❗  Tạo đường dẫn lồng nhau 
- Tận dụng chức năng của React Router để thêm 1 Route lồng ghép mới.
-- Route này sẽ hoạt động nếu path có /comments và thêm prop exact để 0 chỉ đối chiếu phần đầu path mà phải đối chiếu toàn bộ path.
-- Bên trong Route này sẽ kết xuất 1 div vì có thể kết xuất any code JSX nào.

❗Tính năng route lồng nhau giúp hiển thị có điều kiện các nội dung
==> Đây là 1 cách để use tính năng Route lồng ghép để hiển thị có điều kiện context # nhau dựa trên URL mà 0 cần phải quản lý state phức tạp.
*/

/* 📌Viết Routing code linh hoạt hơn
 Hiện tại đang use code danymic có các route có path và link = có code cứng và động kèm.
=> Lúc cần thay đổi thì sẽ thay đổi rất nhiều chỗ, nên cũng chưa hợp lý lắm.
==> Tận dụng tính năng của React Router, cụ thể là some hooks nhất định, cho phép ta biết dc thành phần này dc hiển thị cho URL nào, mà 0 cần lặp lại URL đó

❗Hook useRouteMatch()
- use useRouteMatch tương tự useLocation nhưng có nhiều infomation hơn về Route đang dc tải. (infomation URL, data dc manage nội bộ)
*/

// Tham số URL (Params) là các tham số có giá trị được đặt động trong URL của trang. Điều này cho phép 1 tuyến hiển thị cùng 1 thành phần (UI) trong khi chuyển thành phần đó thành phần động của URL để nó có thể thay đổi dựa trên đó.
// VD: <Route path="/:handle">
//         <Profile />
//     </Route>

// Lưu ý: Có dấu “:” trong đường dẫn, ở phía trước Params. Đó là bởi vì nó động. Thay vì khớp theo nghĩa đen, nó khớp cho 1 mẫu cụ thể. Với UD này, bất cứ khi nào ai đó truy cập 1 tuyến đường phù hợp với mẫu đó (/dan_funix, /tom_bn, hay /use_name), thành phần <Profile /> sẽ được hiển thị.

// Vậy làm cách nào để we truy cập phần động của URL (trong trường hợp này là xử lý) từ thành phần được hiển thị? Kể từ React Router v5.1, React Router đi kèm với 1 Hook tùy chỉnh giúp we thực hiện điều này là Hook useParams(). useParams trả về 1 đối tượng có ánh xạ giữa tham số URL (Params) và giá trị của nó.

// --- Trích xuất Route Params --- //
//  Cần truy cập được giá trị động cụ thể được nhập vào URL
//  Giá trị của params.ProductID
