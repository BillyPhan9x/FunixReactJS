import React, { useState, useEffect, useCallback } from "react";

import AddMoive from "./components/AddMovie/AddMovie";
import MoviesList from "./components/Movie/MoviesList";
import "./App.css";

function App() {
  // use state và khởi tạo thêm trạng thái. Giả sử ban đầu, truyền vào 1 mảng trống.
  const [movies, setMoives] = useState([]);

  // use state xđ trạng thái UD có đang tải dữ liệu hay 0? Ban đầu, 0 tải dữ liệu. Nên cần đặt là false
  const [isLoading, setIsLoading] = useState(false);

  // trạng thái lỗi với error và setError với giá trị trạng thái ban đầu là null. Xử lý lỗi trong quá trình gửi yêu cầu HTTP
  const [error, setError] = useState(null);

  // use Async/await xử lý bất đồng bộ trong quá trình gửi yêu cầu HTTP
  // Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ 1 cách tuần tự hơn
  const fetchMoivesHandler = useCallback(async () => {
    // Khi gọi hàm fetchMoviesHandler và hàm bắt đầu thực thi => cần gọi setIsLoading và thiết lập thành true để thay đổi trạng thái khi bắt đầu tải.
    setIsLoading(true);

    // Whenever fetchMoivesHandler dc kích hoạt => cần đặt lại lỗi này thành null => đảm bảo rằng ta đã xóa mọi lỗi trc đó có thể đã xuất hiện.
    setError(null);

    // Để xử lý các lỗi, thử code và bắt bất kỳ lỗi tiềm ẩn nào.
    try {
      // hàm tìm nạp, cung cấp bởi browser, gửi 1 yêu cầu GET (mặc định), truyền URl dưới dạng string, đối số thứ 2 là 1 đối tượng, tác vụ 0 đồng bộ,  trả về 1 promise
      const response = await fetch(
        "https://react-pvt-http-default-rtdb.firebaseio.com/movies.json"
      );
      console.log(response);

      if (!response.ok) {
        // // Nếu thỏa mãn điều kiện => ném ra lỗi
        throw new Error("Something went wrong!");
      }

      //  Dữ liệu nhận từ API ở định dạng JSON
      // Dữ liệu sau khi đc đổi thành đối tượng qua method .json() sẽ đc lưu trong biến hằng số
      const data = await response.json();
      console.log(data);

      // Biến đổi lại dữ liệu nhận về từ API
      const loadedMovies = []; // tạo 1 mảng với biến lưu trữ 1 mảng trống
      // Tạo 1 vòng lặp for in để lặp qua tất cả các khóa trong dữ liệu.
      for (const key in data) {
        // push vào mảng loadedMovies 1 đối tượng mới cho mọi cặp key-value nhận dc dữ liệu phản hồi.
        loadedMovies.push({
          id: key,
          title: data[key].title, // để đi đến đối tượng dc lồng vào trong phản hồi.
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMoives(loadedMovies);
      // Do gặp lỗi => 0 thể tiếp tục vs các bước tiếp theo. Thay vào đó, ta sẽ đưa code vào khối catch. => Bây giờ error là 1 chuỗi.
    } catch (error) {
      // Vì ta đang quản lý trạng thái lỗi. => Cũng cần kết xuất ra màn hình.
      setError(error.message);
    }
    // Sau những tác vụ đồng bộ, cần gọi lại setIsLoading và thiết lập lại giá trị của nó thành false, bởi vì ta 0 còn tải dữ liệu nữa mà đã có dữ liệu (đã tải xog rồi).
    setIsLoading(false);
  }, []);

  // Tìm nạp dữ liệu ngay lập tức vs useEffect() vì việc gởi yêu cầu HTTP dc coi là 1 'tác dụng phụ' sẽ thay đổi trạng thái components.
  useEffect(() => {
    fetchMoivesHandler();
  }, [fetchMoivesHandler]);

  // Gửi POST Request vs hàm addMovieHandler
  async function addMovieHandler(movie) {
    // Đối số thứ 2 trong method fetch() là 1 đối tượng (có thể định method giao tiếp vs API, mang dữ liệu)
    const response = await fetch(
      "https://react-pvt-http-default-rtdb.firebaseio.com/movies.json",
      {
        // Thiết lập khóa method (mặc định khóa này là GET, ta đổi thành POST)
        method: "POST",
        // Chuyển dữ liệu thành định dạng JSON vs method stringify(nhận 1 đối tượng or mảng JS)
        body: JSON.stringify(movie),
        // Khóa headers và thiết lập 1 đối tượng làm giá trị của headers.
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  // Thêm 1 biến mới là content. Giả sử theo mặc định, biến này sẽ lưu giá trị là 1 đoạn văn bản.
  let content = <p>Found no movie.</p>;
  // Thiết lập giá trị biến thành các nội dung khác tùy thuộc vào trạng thái mà UD đang tồn tại.
  if (movies.length > 0) {
    // trạng thái có dữ liệu
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    // trạng thái có lỗi
    content = <p>{error}</p>;
  }
  if (isLoading) {
    // trạng thái đang tải dữ liệu
    content = <p>Loading...</p>;
  }

  // Hiển thị component vs điều kiện
  return (
    <React.Fragment>
      <section>
        <AddMoive onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

// Trong file App.js, có hàm addMoiveHandler sẽ dc kích hoạt khi nhấn Add Moive.
// - Khi đó, ta sẽ nhận dc 1 đối tượng moive, đối tượng này sẽ chứa title, openingText, releaseDate dc lưu trữ trong biến movie hằng số const trong file AddMoive.js.
// - Một ID sẽ dc Firebase tự động thêm vào.
// - Bên trong hàm addMoiveHandler cần thực hiện(make/made/done/perform/implement/carry) gửi 1 y/c(request/ask/required) HTTP # = cách use Fetch API.
//    - fetch() (ý nghĩa là tìm nạp, có thể gởi dữ liệu nữa.)
//    - Thêm vào đó, cũng có thể gia công 1 số code vào các hàm riêng biệt và lưu trữ chúng trong các file # để giúp file này gọn gàng hơn.
// - Gửi y/c đến cùng 1 URL đc use để lấy dữ liệu của mình, nếu 0 sẽ xảy ra lỗi.

// => Cần thêm tài nguyên đó để lưu trữ. => Thêm tùy chọn body trên đối tượng cấu hình Fetch API.
// - Tùy chọn body: 0 nhận 1 đối tượng JS, mà muốn nhận dữ liệu JSON.
//  - JSON là định dạng dữ liệu, dc use để trao đổi dữ liệu giữa FE & BE.

// Xét về mặt kỹ thuật, Firebase 0 bắt phải thêm headers (nhưng nhiều REST API có thể sẽ phải gửi y/c đến lại y/c để mô tả nội dung dc gửi đi)

//////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, useCallback } from "react";

// import AddMoive from "./components/AddMovie/AddMovie";
// import MoviesList from "./components/Movie/MoviesList";
// import "./App.css";

// function App() {
//   // use state và khởi tạo thêm trạng thái. Giả sử ban đầu, truyền vào 1 mảng trống.
//   const [movies, setMoives] = useState([]);

//   // use state xđ trạng thái UD có đang tải dữ liệu hay 0? Ban đầu, 0 tải dữ liệu. Nên cần đặt là false
//   const [isLoading, setIsLoading] = useState(false);

//   // trạng thái lỗi với error và setError với giá trị trạng thái ban đầu là null. Xử lý lỗi trong quá trình gửi yêu cầu HTTP
//   const [error, setError] = useState(null);

//   // use Async/await xử lý bất đồng bộ trong quá trình gửi yêu cầu HTTP
//   // Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ 1 cách tuần tự hơn
//   const fetchMoivesHandler = useCallback(async () => {
//     // Khi gọi hàm fetchMoviesHandler và hàm bắt đầu thực thi => cần gọi setIsLoading và thiết lập thành true để thay đổi trạng thái khi bắt đầu tải.
//     setIsLoading(true);

//     // Whenever fetchMoivesHandler dc kích hoạt => cần đặt lại lỗi này thành null => đảm bảo rằng ta đã xóa mọi lỗi trc đó có thể đã xuất hiện.
//     setError(null);

//     // Để xử lý các lỗi, thử code và bắt bất kỳ lỗi tiềm ẩn nào.
//     try {
//       // hàm tìm nạp, cung cấp bởi browser, gửi 1 yêu cầu GET (mặc định), truyền URl dưới dạng string, đối số thứ 2 là 1 đối tượng, tác vụ 0 đồng bộ,  trả về 1 promise
//       const response = await fetch("https://swapi.dev/api/films/");
//       console.log(response);

//       if (!response.ok) {
//         // // Nếu thỏa mãn điều kiện => ném ra lỗi
//         throw new Error("Something went wrong!");
//       }

//       //  Dữ liệu nhận từ API ở định dạng JSON
//       // Dữ liệu sau khi đc đổi thành đối tượng qua method .json() sẽ đc lưu trong biến hằng số
//       const data = await response.json();
//       console.log(data);

//       // Biến đổi dữ liệu trước khi use (cho phù hợp vs mong muốn khi use)
//       // Truy cập data.results để có quyền truy cập vào mảng đó.
//       // Use method map để chuyển đổi mọi đối tượng trong mảng results thành 1 mảng các đối tượng mới.
//       // Sau đó, mảng các đối tượng mới sẽ dc lưu trữ trong transformedMovies.
//       const transformedMovies = data.results.map((movieData) => {
//         // Trả về 1 đối tượng mới (đối tượng movie trong UD Frontend)
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMoives(transformedMovies);
//       // Do gặp lỗi => 0 thể tiếp tục vs các bước tiếp theo. Thay vào đó, ta sẽ đưa code vào khối catch. => Bây giờ error là 1 chuỗi.
//     } catch (error) {
//       // Vì ta đang quản lý trạng thái lỗi. => Cũng cần kết xuất ra màn hình.
//       setError(error.message);
//     }
//     // Sau những tác vụ đồng bộ, cần gọi lại setIsLoading và thiết lập lại giá trị của nó thành false, bởi vì ta 0 còn tải dữ liệu nữa mà đã có dữ liệu (đã tải xog rồi).
//     setIsLoading(false);
//   }, []);

//   // Tìm nạp dữ liệu ngay lập tức vs useEffect() vì việc gởi yêu cầu HTTP dc coi là 1 'tác dụng phụ' sẽ thay đổi trạng thái components.
//   useEffect(() => {
//     fetchMoivesHandler();
//   }, [fetchMoivesHandler]);

//   const addMovieHandler = (movie) => {
//     console.log(movie);
//   };

//   // Thêm 1 biến mới là content. Giả sử theo mặc định, biến này sẽ lưu giá trị là 1 đoạn văn bản.
//   let content = <p>Found no movie.</p>;
//   // Thiết lập giá trị biến thành các nội dung khác tùy thuộc vào trạng thái mà UD đang tồn tại.
//   if (movies.length > 0) {
//     // trạng thái có dữ liệu
//     content = <MoviesList movies={movies} />;
//   }
//   if (error) {
//     // trạng thái có lỗi
//     content = <p>{error}</p>;
//   }
//   if (isLoading) {
//     // trạng thái đang tải dữ liệu
//     content = <p>Loading...</p>;
//   }

//   // Hiển thị component vs điều kiện
//   return (
//     <React.Fragment>
//       <section>
//         <AddMoive onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoivesHandler}>Fetch Movies</button>
//       </section>
//       <section>{content}</section>
//     </React.Fragment>
//   );
// }

// export default App;

///////////////////////////////////////////////////////////////////////////

// Use useState() Hook quản lý trạng thái
// import React, { useState } from "react";

// import AddMoive from "./components/AddMovie/AddMovie";
// import MoviesList from "./components/Movie/MoviesList";
// import "./App.css";

// function App() {
//   // use state và khởi tạo thêm trạng thái. Giả sử ban đầu, truyền vào 1 mảng trống.
//   const [movies, setMoives] = useState([]);

//   // use state xđ trạng thái UD có đang tải dữ liệu hay 0? Ban đầu, 0 tải dữ liệu. Nên cần đặt là false
//   const [isLoading, setIsLoading] = useState(false);

//   // trạng thái lỗi với error và setError với giá trị trạng thái ban đầu là null. Xử lý lỗi trong quá trình gửi yêu cầu HTTP
//   const [error, setError] = useState(null);

//   // use Async/await xử lý bất đồng bộ trong quá trình gửi yêu cầu HTTP
//   // Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ 1 cách tuần tự hơn
//   async function fetchMoivesHandler() {
//     // Khi gọi hàm fetchMoviesHandler và hàm bắt đầu thực thi => cần gọi setIsLoading và thiết lập thành true để thay đổi trạng thái khi bắt đầu tải.
//     setIsLoading(true);

//     // Whenever fetchMoivesHandler dc kích hoạt => cần đặt lại lỗi này thành null => đảm bảo rằng ta đã xóa mọi lỗi trc đó có thể đã xuất hiện.
//     setError(null);

//     // Để xử lý các lỗi, thử code và bắt bất kỳ lỗi tiềm ẩn nào.
//     try {
//       // hàm tìm nạp, cung cấp bởi browser, gửi 1 yêu cầu GET (mặc định), truyền URl dưới dạng string, đối số thứ 2 là 1 đối tượng, tác vụ 0 đồng bộ,  trả về 1 promise
//       const response = await fetch("https://swapi.dev/api/films/");

//       if (!response.ok) {
//         // // Nếu thỏa mãn điều kiện => ném ra lỗi
//         throw new Error("Somethig went wrong!");
//       }

//       //  Dữ liệu nhận từ API ở định dạng JSON
//       // Dữ liệu sau khi đc đổi thành đối tượng qua method .json() sẽ đc lưu trong biến hằng số
//       const data = response.json();

//       // Biến đổi dữ liệu trước khi use (cho phù hợp vs mong muốn khi use)
//       // Truy cập data.results để có quyền truy cập vào mảng đó.
//       // Use method map để chuyển đổi mọi đối tượng trong mảng results thành 1 mảng các đối tượng mới.
//       // Sau đó, mảng các đối tượng mới sẽ dc lưu trữ trong transformedMovies.
//       const transformedMovies = data.results.map((movieData) => {
//         // Trả về 1 đối tượng mới (đối tượng movie trong UD Frontend)
//         return {
//           id: movieData.episod_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.releaseDate_date,
//         };
//       });
//       setMoives(transformedMovies);
//       // Do gặp lỗi => 0 thể tiếp tục vs các bước tiếp theo. Thay vào đó, ta sẽ đưa code vào khối catch. => Bây giờ error là 1 chuỗi.
//     } catch (error) {
//       // Vì ta đang quản lý trạng thái lỗi. => Cũng cần kết xuất ra màn hình.
//       setError(error.message);
//     }
//     // Sau những tác vụ đồng bộ, cần gọi lại setIsLoading và thiết lập lại giá trị của nó thành false, bởi vì ta 0 còn tải dữ liệu nữa mà đã có dữ liệu (đã tải xog rồi).
//     setIsLoading(false);
//   }

//   const addMovieHandler = (movie) => {
//     console.log(movie);
//   };
//   // Hiển thị component vs điều kiện
//   return (
//     <React.Fragment>
//       <section>
//         <AddMoive onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoivesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {isLoading && movies.length === 0 && !error && <p>Found no moives.</p>}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
// // Thiết lập sao cho chỉ kết xuất list film nếu đang 0 tải dữ liệu. Thể hiện rằng nếu !isLoading là true thì cần hiển thị MoviesList.
// // -- Thiết lập sao chỉ chỉ hiển thị sanh sách phim nếu 0 tải và độ dài mảng movies > 0

// // Cần hiển thị 1 nội dung dự phòng nếu 0 tải dữ liệu (0 có dữ liệu).
// // -- Cần hiển thị 1 nội dung dự phòng nếu 0 tải dữ liệu mà cũng 0 có phim.
// // --- Xử lý chỉ thông báo lỗi mà 0 cần hiển thị nội dụng dự phòng
// // Còn khi đang tải dữ liệu (isLoading là true) thì hiển thị dòng chữ Loading....

////////////////////////////////////////////////////////////////////////////

// // Use useState() Hook quản lý trạng thái
// import React, { useState } from "react";

// import AddMoive from "./components/AddMovie/AddMovie";
// import MoviesList from "./components/Movie/MoviesList";
// import "./App.css";

// function App() {
//   // use state và khởi tạo thêm trạng thái. Giả sử ban đầu, truyền vào 1 mảng trống.
//   const [movies, setMoives] = useState([]);
//   // Để gửi các yêu cầu HTTP we có thể use gói axios trên GitHub (thư viện của bên thứ 3)
//   // Use Promise xử lý bất đồng bộ trong quá trình gởi y/c HTTP với cơ chế tích hợp Fetch API.
//   const fetchMoivesHandler = () => {
//     // hàm tìm nạp, cung cấp bởi browser, gửi 1 yêu cầu GET (mặc định), truyền URl dưới dạng string, đối số thứ 2 là 1 đối tượng, tác vụ 0 đồng bộ,  trả về 1 promise
//     fetch("https://swapi.dev/api/films/")
// fetch() sẽ trả về 1 promise, đó là lý do why ta gọi then().
//       //  Dữ liệu phản hồi từ API sẽ đc nhận trong .then() đầu tiên
//       .then((response) => {
//         //  Dữ liệu nhận từ API ở định dạng JSON
//         return response.json();
//       })
//       // Dữ liệu sau khi đc đổi thành đối tượng qua method .json() sẽ đc nhận trong .then() thứ 2
//       .then((data) => {
//         // Truy cập data.results để có quyền truy cập vào mảng đó.
//         // Biến đổi dữ liệu trước khi use (cho phù hợp vs mong muốn khi use)
//         // Use method map để chuyển đổi mọi đối tượng trong mảng results thành 1 mảng các đối tượng mới.
//         // Sau đó, mảng các đối tượng mới sẽ dc lưu trữ trong transformedMovies.
//         const transformedMovies = data.results.map((movieData) => {
//           // Trả về 1 đối tượng mới (đối tượng movie trong UD Frontend)
//           return {
//             id: movieData.episod_id,
//             title: movieData.title,
//             openingText: movieData.opening_crawl,
//             releaseDate: movieData.releaseDate_date,
//           };
//         });
//         setMoives(transformedMovies);
//       });
//   };

//   const addMovieHandler = (movie) => {
//     console.log(movie);
//   };

//   return (
//     <React.Fragment>
//       <section>
//         <AddMoive onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoivesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={movies} />
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
// // Truyền movies làm giá trị cho prop movies.

// // Kết nối fetchMoviesHandler() vs button

////////////////////////////////////////////////////////////////////////////

// import React from "react";

// import AddMoive from "./components/AddMovie/AddMovie";
// import MoviesList from "./components/Movie/MoviesList";
// import "./App.css";

// function App() {
//   const addMovieHandler = (movie) => {
//     console.log(movie);
//   };

//   return (
//     <React.Fragment>
//       <section>
//         <AddMoive onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={dummyMovies} />
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
