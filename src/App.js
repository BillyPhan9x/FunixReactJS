import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/quotes" />
      </Route>
      <Route path="/quotes" exact>
        <AllQuotes />
      </Route>
      <Route path="/quotes/:quoteId">
        <QuoteDetail />
      </Route>
      <Route path="/new-quote">
        <NewQuote />
      </Route>
    </Switch>
  );
}

export default App;

// our-domain.com/ => component A
// our-domain.com/products => component B

// Route: Định nghĩa 1 ánh xạ (mapping) giữa 1 URL và 1 Component. Điều đó có nghĩa là khi user truy cập theo 1 URL trên trình duyệt, 1 Component tương ứng sẽ được render trên giao diện.

//  Props path trong Route là đường dẫn URL trong UD
// path: Là đường dẫn trên URL. Giá trị trong dấu "" or '' hoạt động như 1 phương thức truy cập khi đường dẫn nhập vào 0 xđ (0 khớp với bất kỳ đường dẫn nào được quy định).

// Trong thực tế, URL thay đổi, nội dung trang web cũng thay đổi

// - Package phổ biến giúp tạo các UD multiple-page React - Thư viện use phổ biến React Router (provider routing phía client)
// routing đơn giản có nghĩa là các URL # nhau, các path # nhau trong URL tải các page # nhau.
// Hai phiên bản chính của React Router v5, v6
// Thêm thư viện React Router - v5 với lệnh npm install react-router-dom@5

// - React Router sẽ đảm bảo rằng nó đánh giá URL và hiển thị các thành phần chính xác dựa trên URL đó.

// --- Thêm các Dynamic Route với Params --- //

// --- Định cấu hình Router --- //
// Switch: Gom nhóm các route và đảm bảo tại 1 thời điểm chỉ render duy nhất 1 component đầu tiên có url hiện tại trùng với path của Route.

// exact: Giúp cho Route này chỉ hoạt động nếu URL trên trình duyệt phù hợp tuyệt đối với giá trị của thuộc tính path của nó.

// Redirect: Thành phần sẽ điều hướng đến 1 vị trí mới.

// -📌 Từ Reat Router 5, việc route cụ thể hơn 0 còn quan trọng nữa.
//-- React Router chỉ đơn giản là đi qua các route từ đầu đến cuối. Và khi nó tìm thấy 1 kết quả phù hợp (nó khớp vs điểm bắt đầu of 1 path, 0 phải all path)
//--- Nếu nó tìm thấy 1 kết quả phù hợp, nó sẽ dừng lại do Switch, 0 nhìn vào các Route # và hiển thị route mà nó đã tìm thấy kết quả phù hợp.

// ---- Giải pháp: 1. Thay đổi thứ tự hiển thị các router thủ công.
// ---- Giải pháp: 2. Giữ nguyên như ban đầu và thêm 1 prop # trên các thành phần <Route exact>
