import { User, LoginData, RegisterData } from "../hooks/useAuth";

export const login = async (
  params: LoginData
): Promise<User> => {
  const response = await fetch(`http://localhost:8000/api/users/login`, {
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
    throw new Error("Login attempt did not result in a server response");
  }
};
