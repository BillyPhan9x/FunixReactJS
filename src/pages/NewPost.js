import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

const NewPostPage = () => {
  const data = useActionData();

  // cung cấp 1 {} hiển thị some info điều hướng.
  const navigation = useNavigation();
  console.log(navigation.state);

  const navigate = useNavigate();

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {data && data.isError && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.status === "submitting"}
      />
    </>
  );
};

export default NewPostPage;

export async function action({ request }) {
  const data = await request.formData();

  const validationError = await savePost(data);
  if (validationError) {
    return validationError;
  }

  return redirect("/blog");
}

/*
//// ----Demo first: gửi  ---- ////

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePosts } from "../util/api";

const NewPostPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const post = {
        title: formData.get("title"),
        body: formData.get("post-text"),
      };
      await savePosts(post);
      navigate("/");
    } catch (err) {
      setError(err);
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {error && <p>{error.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        submitting={isSubmitting}
      />
    </>
  );
};

export default NewPostPage;
*/
