import { useEffect, useState } from "react";
// Ba biến globalState và listener, actions mới tạo trong store.js chỉ có phạm vi trong khối tệp này
let globalState = {};
let listeners = [];
let actions = {};

//📌 XD Hook useStore() vs JS và Hook useState(), useEffect() để tạo cơ chế hiển thị lại các thành phần
// 📌 Nếu 1 thành phần use Hook custom và Hook custom đó use useState() thì thành phần đó sẽ hiển thị lại khi Hook useState() trong Hook custom kích hoạt việc kết xuất lại (re-render)

// (biến) Đưa vào trạng thái in hook custom, use biến dc xd ngoài hook => biến toàn cục. Nó sẽ 0 dc tạo lại khi ta gọi hook custom.
// - Thay vào đó, nó sẽ chỉ dc tạo 1 lần duy nhất khi file hook custom dc nhập vào đâu đó vs lệNh import ==> Bất kỳ file nào nhập và use store.js cũng sẽ use cùng 1 trạng thái
// - Chia sẽ dữ liệu giữa các file và tận dụng lệnh import. (Nếu để dữ liệu in hook, sẽ 0 dc chia sẻ, mà mỗi component sẽ ôm dữ liệu của riêng nó)

export const useStore = (sholdListen = true) => {
  // use kỹ thuật destructuring để trích xuất phần tử
  // chỉ trích xuất hàm setState vì chỉ quan tâm đến value thứ 2 trong mảng mà useState() trả về.
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    //  actionIdentifier sẽ là 1 khoá của {} actions sau khi nó dc đký trong {} actions global.
    // actions[actionIdentifier]() phải là 1 hàm, vì vậy nó cũng phải là 1 {} có chứa khoá khớp vs định danh actionIdentifier và giá trị sẽ là 1 hàm dc gọi = cách thêm 1 cặp dấu ngoặc đơn ().
    // Hàm đc gọi sẽ nhận state global, chính là globalState và phải trả về 1 state mới. (Gần giống vs Redux)
    // nhận 1 actionIdentifier, sau đó tìm action in {} actions. (Kỳ vọng action phải là 1 hàm cần thực thi, ↔ 1 hàm reducer, trả về state new tức là newState
    const newState = actions[actionIdentifier](globalState, payload);
    // Cập nhật globalState use Syntax Object Destructuring trong ES6.
    // Hợp nhất newState vs state cũ => globalState sẽ là 1 {} dc hình thành từ dữ liệu cũ và mới.
    globalState = { ...globalState, ...newState };
    // Thông báo cho các listener biết về việc cập nhật trạng thái
    for (const listener of listeners) {
      listener(globalState);
    }
  };
  // Ngoài actionIdentifier, ta cần truyền vào dispatch() thêm 1 payload
  // - Để ta có thể chuyển tiếp payload đó vào hàm actions luôn, payload có thể là 1 đối tượng, 1 chuỗi hoặc 1 số, tùy nhu cầu use.

  //  Hook useEffect() để xử lý việc unmount hay mount(gắn kết) 1 thành phần
  useEffect(() => {
    if (sholdListen) {
      // đẩy hàm setState vào mảng listeners
      listeners.push(setState);
      // hàm để bỏ listener mỗi khi có 1 thành phần bị loại bỏ
    }
    return () => {
      // so sánh !== setState vì setState là thứ dc truyền listeners. Vì nhờ closure, do đó giá trị của setState sẽ giữ nguyên vs componet hook custom.
      if (sholdListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, sholdListen]);

  // Để React có thể biết được setState mới tạo là hàm cập nhật trạng thái.
  // - React đảm bảo là các hàm update state sẽ 0 bao giờ change vs 1 component.
  // => Demo, trong useEffect(), có 1 depensive 0 bao giờ change (chỉ chạy 1 lần và xoá listener 1 lần).
  // - Có thể bỏ setState in depensive nếu use destructuring

  //  Hook custom này trả về 1 mảng gồm 2 phần tử là globalState và dispatch
  return [globalState, dispatch];
};

// Xuất ra initStore để ta có thể quản lý vs store toàn cục
// Giống Redux, vô số các reducer hình thành nên 1 store toàn cục. (hợp nhất các reducer để tạo 1 {} store duy nhất.)
// Hàm nhận 2 đối số để xđ vì hiện tại globalState luôn là state trống. Có thể ngay từ ban đầu ta có some state nào đó (chẳng hạn như mấy product first on page)
export const initStore = (userActions, initialState) => {
  if (initialState) {
    // nếu 0 null, thiết lập vì sẽ chia sẻ file store.js (trạng thái)
    // hợp nhất globalState vs initialState để CAN quản lý nhiều thứ
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
// => Đã đký xong globalState, actions, v.v.v

//
//
// 📌 Mỗi khi hàm setState() được gọi, thành phần use hook custom sẽ kết xuất lại và ta sẽ cần giá trị này để kết xuất lại các thành phần khi trạng thái Change

// Nhập listeners.push(setState) để đẩy hàm setState vào mảng listeners
// - Mọi thành phần use hook custom của ta sẽ có hàm setState của riêng nó, sau đó hàm này sẽ được thêm vào mảng listeners được chia sẻ giữa các thành phần.

// - Nếu càng thêm nhiều thành phần use Hook custom thì mảng listeners sẽ càng tăng. Khi unmount(loại bỏ) 1 thành phần thì hàm setState của thành phần đó cũng phải được bỏ ra khỏi mảng listener.

// - Chạy mỗi khi 1 component use hook custom cập nhật.
// - Thêm đối số thứ 2 vào useEffect() để xđ mảng phụ thuộc. Nếu mảng depensive trống thì useEffect() sẽ chỉ chạy cho component use hook custom khi component đó mount.

// React cho phép WE có thể tự XD Hook để tái use logic trong quá trình XD UD.

// Đơn giản là 1 function, nhận input và trả ra output.
// Tên của nó bắt đầu bởi use ví dụ như useHttp, useQuery, useColor, …
// # vs function component, Custom Hook trả về 1 dữ liệu bình thường, 0 phải là jsx
// Custom Hook có thể use các Hook # như useState, useRef, …
// Logic trong Custom Hook là chung nhất để có thể use lại.

/*
import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let acions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = acions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listeners(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.remove((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  acions = { ...acions, ...userActions };
};
*/
