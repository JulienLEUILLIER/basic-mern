import { LoginData } from "../pages/Login";
import { RegisterData } from "../pages/Register";

export const login = async (
  params: LoginData
): Promise<{ _id: string; name: string; email: string }> => {
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

export const register = async (
  params: RegisterData
): Promise<{ _id: string; name: string; email: string; token: string }> => {
  const response = await fetch("localhost:8000/api/users/", {
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

// export const getCurrentUser = async (): Promise<User> => {
//   const response = await fetch("http://localhost:8000/api/users/me", {
//     method: "POST",

//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },

//     body: {
//       id:
//     }
//   });
// }
