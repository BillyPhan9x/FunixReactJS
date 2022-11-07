import { useParams } from "react-router-dom";

const QuoteDetail = () => {
  const params = useParams();

  return (
    <section>
      <h1>Quote Detail Page</h1>
      <p>{params.quoteId}</p>
    </section>
  );
};

export default QuoteDetail;

// Tham số URL (Params) là các tham số có giá trị được đặt động trong URL của trang. Điều này cho phép 1 tuyến hiển thị cùng 1 thành phần (UI) trong khi chuyển thành phần đó thành phần động của URL để nó có thể thay đổi dựa trên đó.
// VD: <Route path="/:handle">
//         <Profile />
//     </Route>

// Lưu ý: Có dấu “:” trong đường dẫn, ở phía trước Params. Đó là bởi vì nó động. Thay vì khớp theo nghĩa đen, nó khớp cho 1 mẫu cụ thể. Với UD này, bất cứ khi nào ai đó truy cập 1 tuyến đường phù hợp với mẫu đó (/dan_funix, /tom_bn, hay /use_name), thành phần <Profile /> sẽ được hiển thị.

// Vậy làm cách nào để we truy cập phần động của URL (trong trường hợp này là xử lý) từ thành phần được hiển thị? Kể từ React Router v5.1, React Router đi kèm với 1 Hook tùy chỉnh giúp we thực hiện điều này là Hook useParams(). useParams trả về 1 đối tượng có ánh xạ giữa tham số URL (Params) và giá trị của nó.

// --- Trích xuất Route Params --- //
//  Cần truy cập được giá trị động cụ thể được nhập vào URL
//  Giá trị của params.ProductID
