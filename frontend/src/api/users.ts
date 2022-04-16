import { User } from "../pages/Register";

export const getCurrentUser = async (params: {
  _id: string;
  name: string;
  email: string;
}): Promise<User> => {
  const response = await fetch("/api/users/me", {
    method: "POST",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },

    body: JSON.stringify(params),
  });

  if (response.ok) {
    const user = await response.json();

    return user;
  } else {
    throw new Error("Could not get current authenticated user");
  }
};

export const register = async (params: User): Promise<{ _id: string; name: string; email: string; token: string }> => {
  const response = await fetch("http://localhost:8000/api/users/", {
    method: "POST",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },

    body: JSON.stringify(params),
  });

  if (response.ok) {
    const data = await response.json();

    const keys = Object.keys(data);

    keys.forEach((key) => {
      localStorage.setItem(key, data[key]);
    });

    return data;
  } else {
    throw new Error("Register attempt did not result in a server response");
  }
};
