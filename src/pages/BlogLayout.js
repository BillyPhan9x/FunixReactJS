import { Outlet } from "react-router-dom";

import BlogActions from "../components/BlogActions";

const BlogLayout = () => {
  return (
    <>
      <BlogActions />
      <Outlet />
    </>
  );
};

export default BlogLayout;
