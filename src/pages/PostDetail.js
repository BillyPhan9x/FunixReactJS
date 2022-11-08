import { useLoaderData } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import NewsletterSignup from "../components/NewsletterSignup";
import { getPost } from "../util/api";

const PostDetailPage = () => {
  const postData = useLoaderData();

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
      <NewsletterSignup />
    </>
  );
};

export default PostDetailPage;

export function loader({ params }) {
  const postId = params.id;

  return getPost(postId);
}

/*
//// ----Demo first: hiện thị sau khi thành phần tải ---- ////

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import { getPost } from "../util/api";

const PostDetailPage = () => {
  const [error, setError] = useState();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const post = await getPost(id);
        setPost(post);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPost();
  }, [id]);

  return (
    <>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && <BlogPost title={post.title} text={post.body} />}
    </>
  );
};

export default PostDetailPage;
*/
