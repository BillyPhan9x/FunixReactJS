import React, { useEffect, useState } from "react";

import useHttp from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  // Đặt tên hàm và nhận tham số là 1 đối tượng task
  const transformTasks = (taskObj) => {
    // áp dụng logic chuyển đổi
    const loadedTasks = [];
    // lặp qua đối tượng taskObj vs vòng lặp for in => Để chuyển đổi all các đối tượng lấy dc từ Firebase thành các đối tượng có cấu trúc và định dạng phù hợp.
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    // Thiết lập trạng thái tasks (cập nhật trạng thái)
    setTasks(loadedTasks);
  };

  // gọi useHttp hook custom và lưu giá trị vào biến hằng số
  const httpData = useHttp();

  // Lấy ra các giá trị trả về từ Hook useHttp()
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    // Truyền 1 con trỏ đến hàm transformTasks làm đối số thứ 2.
    fetchTasks(
      {
        url: "https://react-pvt-http-default-rtdb.firebaseio.com//tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

// Đối vs requestConfig thì truyền vào 1 đối tượng có 1 thuộc tính URL vì bên trong hook custom đang truy cập 1 thuộc tính URL.
// - Đối vs App chỉ muốn tìm nạp dữ liệu, cần gửi 1 y/c GET nên ko cần method, body, headers.

// Cung cấp đối số thứ 2 là hàm applyData() nhận đối số là data.
// - Đưa logic ra ngoài để cho dễ đọc, dễ nhìn. Xác định hàm đó trc khi gọi.
// useHttp() sẽ gọi hàm transformTasks whenever nhận dc phản hồi.

// use kỹ thuật destructuring = cách trỏ đến httpData và từ đó lấy ra dữ liệu isLoading, error, sendRequest.
// - chỉ định 1 alias( 1 tính năng có trong JS) = bằng thêm dấu : vào trong syntax destructuring và đặt cho sendRequest 1 cái tên # là fetchTasks.
// - vẫn trỏ đến hàm sendRequest từ hook custom chỉ là đổi tên hàm bên trong hàm thành phần App.

// 📌Mọi dữ liệu or hàm dc thiết lập bên trong 1 hàm thành phần và dc use trong useEffect() phải dc truyền vào useEffect() dưới dạng 1 phụ thuộc.
// Việc thêm fetchTasks làm phụ thuộc trong useEffect() sẽ tạo ra 1 vòng lặp vô hạn.
//  - Bởi vì khi gọi fetchTasks() hàm này sẽ thực thi hàm sendRequest trong hook useHttp().
//  - Hàm sendRequest sau đó sẽ thiết lập 1 số trạng thái. Khi các state dc thiết lập, thành phần use hook custom sẽ dc hiển thị lại.

// - Giải thích:
//     - Khi use hook tùy chỉnh, hook này lại use trạng thái, hook lại nằm trong 1 thành phần thì thành phần đó sẽ ngầm use trạng thái dc thiết lập trong hook tùy chỉnh.
//     - Trạng thái dc định cấu hình trong hook custom sẽ dc gắn vào thành phần use hook custom.
//   - Vì vậy, nếu ta gọi setIsLoading và setError trong hàm sendRequest trong hook custom thì sẽ kích hoạt việc đánh giá lại thành phần App. Vì đang use hook custom useHttp() ngay trong App.
//   - Và khi thành phần dc đánh giá lại, hook custom sẽ dc gọi lại, mà khi hook custom dc gọi lại, ta sẽ tạo lại hàm sendRequest và trả về 1 đối tượng hàm mới.
//   => Do đó, useEffect() sẽ chạy lại.
// - Điều đó xãy ra vì : Giải thích:
//  - Các hàm là các đối tượng trong JS. Mỗi khi 1 hàm dc tạo lại thì ngay cả khi nó chứa cùng 1 logic cũ, nó vẫn sẽ dc coi là 1 đối tượng hoàn toàn mới trong bộ nhớ.
//  => Do đó , useEffect() sẽ coi hàm là 1 hàm mới. (về mặt kỹ thuật vẫn là hàm đó) => useEffect() sẽ thực thi lại hàm.
// ==> Giải quyết vấn đề vs useCallback() trong file hook custom vs hàm sendRequest
