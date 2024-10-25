import { Status } from "../__mocks__/groups-types";

export async function generateDescription() {
  const res = await fetch(`http://62.60.157.68:5000/generate_description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      category: "Здоровье",
      text: "Мини задание на день: сделай 10 отжиманий",
    }),
  });

  const result = await res.json();
}

export async function getAllPosts(status: Status) {
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
