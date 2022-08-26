import "./Card.css";

function Card(props) {
  // Xây dựng class cho thành phần Card, đảm bảo style cho các thành phần bên trong
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

// Concept of "Composition" ("children props")
export default Card;

// Ý tưởng đằng sau all components này cần có  building blocks(các khối XD)(tái sử dụng đc)reusable và cũng để tránh trùng lặp code.
// Hiện tại có 1 số kiểu dáng trang trí (trùng lặp)duplicate nhau, (1 số)some cấu trúc HTML duplicate.

// Tuy nhiên, đôi khi ta cần có 1 component 0 định cấu hình thông qua prop mà để I can truyền content between tags open and tags close of component đó.

// Phải use  1 loại prop đặc biệt đc tích hợp sẵn trong React mà mọi component đều có thể nhận ngay cả khi prop đó 0 dc thiết lập cụ thể. Đây là 1 prop I can use để hiển thị giá trị between element's open and close of div inside hàm component Card().

//  Cũng như vậy, nhưng chí ít đã có thể bỏ bớt các code trùng nhau bên trong file CSS và đưa chúng vào thành phần bao bọc riêng biệt là Card.
// --> Đây là khía cạnh của hướng tiếp cận XD kết hợp
// -- 1 thành phần đặc biệt quan trọng của hướng tiếp cận kết hợp chính là prop children. Vì cho phép tạo các thành phần bao bọc.
