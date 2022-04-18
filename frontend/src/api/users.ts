import { RegisterData, User } from "../hooks/useAuth";

export const getCurrentUser = async (token: string | null): Promise<User> => {
  if (!token) {
    throw new Error("No token sent to get current user");
  }

  const bearer = "Bearer " + token;

  const response = await fetch("/api/users/me", {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: bearer,
    },
  });

  if (response.ok) {
    const user = await response.json();

    return user;
  } else {
    throw new Error("Could not get current authenticated user");
  }
};

export const register = async (
  params: RegisterData
): Promise<{ user: User; token: string }> => {
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
