import { LoginData } from "../pages/Login";

interface User {
  _id: string;
  name: string;
  email: string;
}

export const login = async (params: LoginData): Promise<User> => {
  const response = await fetch("http://localhost:8000/api/users/login", {
    method: "POST",

    body: JSON.stringify(params),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();

  return data;
};
