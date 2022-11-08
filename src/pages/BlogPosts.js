// import { json, useNavigation, defer } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

import Posts from "../components/Posts";
import { getPosts } from "../util/api";
// import { sleep } from "../util/sleep";

const BlogPostsPage = () => {
  // React Router sẽ auto call hàm whenever we Route tuyền đường này và auto lấy dữ liệu do hàm loader trả về =>
  // use hook đặc biệt provider bởi react-router-dom
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      {<Posts blogPosts={loaderData} />}
    </>
  );
};

export default BlogPostsPage;

// xuất chức năng, sẽ cần ở some nơi khác
export async function loader({ request, params }) {
  // await sleep(2000);
  // return json([{ id: 'p1', title: 'First Post' }]); //same as return [] without json(...) (because useLoaderData() parses JSON automatically)
  // return fetch('https://jsonplaceholder.typicode.com/posts');
  return getPosts();
}

/*
//// ----Demo first: cục bộ and khó quản lý, bảo trì, code trùng lặp nhiều ---- ////

import { useEffect, useState } from "react";

import Posts from "../components/Posts";
import { getPosts } from "../util/api";

const BlogPostsPage = () => {
  const [error, setError] = useState();
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <>
      <h1>Our Blog Posts</h1>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error}</p>}
      {!error && posts && <Posts blogPosts={posts} />}
    </>
  );
};

export default BlogPostsPage;
*/
