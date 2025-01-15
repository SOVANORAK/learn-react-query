import { CreatePostRequestType } from "./types";

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const res = await fetch(`${BASE_API_URL}/users`);
  return res.json();
};

export const createPost = async (body: CreatePostRequestType) => {
  const res = await fetch(`${BASE_API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};
