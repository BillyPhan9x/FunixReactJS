import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
// All components dc xđ inside of tuyến gốc sẽ dc hiển thị tại vị trí đặt đặc biệt bởi component Outlet.

export default RootLayout;
// Có thể ở folder component or pages (tuỳ thích)

/*
//// ---- Demo: children ở đây 0 còn dc use nữa ---- ////
import MainNavigation from "../components/MainNavigation";

function RootLayout({ children }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default RootLayout;
*/
