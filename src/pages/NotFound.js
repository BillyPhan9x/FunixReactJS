const NotFound = () => {
  return (
    <div className="centered">
      <p>Page not found!</p>
    </div>
  );
};

export default NotFound;

// Xử lý vấn đề khi trang 0 có nội dung hay 0 tìm thấy nội dung
// Tức là 1 route hoàn toàn 0 xđ đc => Thông báo cho user biết rằng page này 0 tồn tại.
