import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import DeferredBlogPostsPage, {
  loader as deferredBlogPostsLoader,
} from "./pages/DeferredBlogPosts";
import ErrorPage from "./pages/Error";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import { action as newsletterAction } from "./pages/Newsletter";
import PostDetailPage, { loader as blogPostLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";

// Tạo 1 bộ định tuyến outside function component
// - Can be create with help some of define tuyến JS.
// -- Tryền 1 mảng, sau đó mọi {} in mảng sẽ đại diện cho 1 tuyến đường.
// const router = createBrowserRouter([
//   { path: '/', element: <WelcomePage /> }
// ]);
// OR: Cách khác
// -- Truyền 1 hàm createRoutesFromElements cho createBrowserRouter và gọi nó.
// --- Sau đó chuyển defines tuyến vào inside hàm.
// Lưu ý: Khi viết code = cách này thì Routes 0 còn dc use. Thay vào đó, 1 tuyến mẹ chứa các tuyến con.
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: "/blog",
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <DeferredBlogPostsPage />,
            loader: deferredBlogPostsLoader,
          },
          {
            path: ":id",
            element: <PostDetailPage />,
            loader: blogPostLoader,
          },
        ],
      },
      {
        path: "/blog/new",
        element: <NewPostPage />,
        action: newPostAction,
      },
    ],
  },
  {
    path: "/newsletter",
    action: newsletterAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/*

//// ---- Demo first ---- ////

import { BrowserRouter, Route, Routes } from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, {loader as blogPostsLoader} from "./pages/BlogPosts";
import NewPostPage from "./pages/NewPost";
import PostDetailPage from "./pages/PostDetail";
import RootLayout from "./components/RootLayout";
import WelcomePage from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogPostsPage />} loader={blogPostsLoader}/>
            <Route path=":id" element={<PostDetailPage />} />
          </Route>
          <Route path="/blog/new" element={<NewPostPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
*/
