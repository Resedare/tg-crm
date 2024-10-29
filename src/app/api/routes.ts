import { PostInterface, Status } from "../utils/types";

export async function getAllPosts(status: Status | null) {
  const res = await fetch(`http://62.60.157.68:5000/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ status: status }),
  });

  const result = await res.json();
  return result;
}

export async function getPostInfo(hash: string) {
  const res = await fetch(`http://62.60.157.68:5000/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ hash: hash }),
  });

  const result = await res.json();
  return result;
}

export async function generatePostTitle(category: string) {
  const res = await fetch(`http://62.60.157.68:5000/generate_title`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ category: category }),
  });

  const result = await res.json();
  return result;
}

export async function generatePostDescription(text: string, category: string) {
  const res = await fetch(`http://62.60.157.68:5000/generate_description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      category: category,
      text: text,
    }),
  });

  const result = await res.json();
  return result;
}

export async function generatePostImg(text: string, category: string) {
  const res = await fetch(`http://62.60.157.68:5000/generate_img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      category: category,
      text: text,
    }),
  });

  const result = await res.json();
  return result;
}

export async function generatePostFull(category: string) {
  const res = await fetch(`http://62.60.157.68:5000/generate_post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const result = await res.json();
  return result;
}

export async function savePost(post: PostInterface) {
  const res = await fetch(`http://62.60.157.68:5000/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(post),
  });

  const result = await res.json();
  return result;
}

export async function deletePost(hash: string) {
  const res = await fetch(`http://62.60.157.68:5000/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ hash: hash }),
  });

  const result = await res.json();
  return result;
}
