import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  // gọi useHttp hook custom , nhận 1 đối tượng và use kỹ thuật destructuring vs đối tượng đó để truy cập isLoading, error, sendRequest.
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createdTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    // gọi hàm vì muốn gửi y/c whenever enterTaskHandler dc kích hoạt (khi biểu mẫu dc gửi đi)
    sendTaskRequest(
      {
        url: "https://react-pvt-http-default-rtdb.firebaseio.com//tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

// gọi useHttp(), 0 cần truyền bất kỳ tham số nào vào hook này nhờ có việc tái cấu trúc ở useHttp hooks custom 0 có tham số, nên 0 cần đối số.
//- chỉ định 1 alias( 1 tính năng có trong JS) = bằng thêm dấu : vào trong syntax destructuring và đặt cho sendRequest 1 cái tên # là sendTaskRequest.

// - Truyền vào hàm sendTaskRequest 2 đối số:
//   - Đối số thứ 1 là 1 đối tượng: {}
//   - Có url dc thiết lập là 1 link url dẫn đến database ở Backend App.
//   - Và do muốn gởi 1 y/c POST => cần thiết lập method: 'POST'.
//   - Thiết lập khóa headers là đối tượng headers với giá trị 'Content-Type' : 'application/json'.
//   - Thêm body nhưng 0 cần thêm JSON.stringify() vì việc chuyển đổi JSON đã dc thực hiện bên trong hook custom useHttp() rồi. Thay vào đó, thiết lập body là đối tượng {text: taskText}
//  => Như vậy là xong đối tượng config.
//  - Đối số thứ 2 là 1 hàm nhận dữ liệu phản hồi và thực hiện 1 số việc.
//   - Trích xuất ID đã tạo mà Firebase auto cung cấp và lưu vào biến hằng số generatedID.
//   - Tạo 1 đối tượng task kết hợp vs ID đó.
//   - Sau đó, gọi prop onAddTask

//     -- Giả sử tạo tên hàm createTask và nhận taskData làm đối số.

// => 0 cần đến useCallback() hay bất cứ điều gì tương tự. Bởi vì ta chỉ gọi sendTaskRequest trong enterTaskHandler, chứ 0 phải inside useEffect().
//  => Do đó, sẽ 0 gặp vòng lặp vô hạn, bởi vì y/c sendTaskRequest sẽ 0 dc gửi whenever thành phần dc đánh giá lại. Mà chỉ khi nào hàm enterTaskHandler chạy (mà hàm này chạy chỉ khi biểu mẫu dc gửi đi.)

// - Để làm taskText khả dụng inside hàm createTask (hàm ta đã truyền vào sendTaskRequest) , có 2 cách:
// - C1: Đưa hàm createTask vào inside hàm enterTaskHandler (nơi xác định hàm) để có 1 hàm lồng nhau inside 1 hàm lồng nhau (hoạt động nhờ vào cách thức hoạt động của phạm vi truy cập trong JS )
// - C2: Để hàm createTask outside hàm enterTaskHandler để tránh tình trạng lồng nhau. Thay vào ta, ta sẽ nhận thêm tham số là taskText là 1 đối số .

// method bind(): method JS mặc định có thể use trên any đối tượng hàm để cấu hình trc cho hàm. (0 thực thi ngay lập tức)
// - Đối số đầu tiên truyền vào bind() cho phép ta thiết lập từ khóa this trong hàm sẽ dc thực thi. 0 cần quan tâm và có thể đặt giá trị đối số này là null.
// - Đối số thứ 2 dc truyền vào bind() sẽ là đối số đầu tiên mà hàm chuẩn bị dc gọi sẽ nhận.
// Nếu muốn truyền taskText vào createTask, truyền taskText vào bind() làm đối số thứ 2 để tham chiếu đến taskText nhận dc từ việc gửi biểu mẫu.
