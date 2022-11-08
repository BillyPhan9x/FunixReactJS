import { sleep } from "./sleep";

export async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    const errorMessage = { message: "Failed to fetch posts.", status: 500 };
    throw errorMessage;
  }
  return response.json();
}

export async function getSlowPosts() {
  await sleep(2000);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    const errorMessage = { message: "Failed to fetch posts.", status: 500 };
    throw errorMessage;
  }
  return response.json();
}

export async function getPost(id) {
  return fetch("https://jsonplaceholder.typicode.com/posts/" + id);
}

export async function savePost(data) {
  const post = {
    title: data.get("title"),
    body: data.get("post-text"),
  };

  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    return { isError: true, message: "Invalid input data provided." };
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw response;
  }
}

/* 
throw { message: "Could not save post.", status: 500 } // lỗi eslint 
- Khăc phục lỗi: lưu trữ biến và ném 
const errorMessage = { message: "Could not save post.", status: 500 };
throw errorMessage;

Hoặc: ném 1 lỗi (thông thường)regular and (mở rộng nó)extend it with (các trường)fields tuỳ chỉnh 
throw Object.assign(
   new Error(myMessage),
   { code: 402 }
);

*/
