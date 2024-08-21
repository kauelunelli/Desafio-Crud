import { api } from "../lib/axios";


export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/singup", {
      name,
      email,
      password,
    });

    if (response.status === 400) {
      throw new Error("Invalid email or password");
    }
    window.location.href = "/login";
  } catch (error) {
    throw new Error("An error occurred" + error);
  }
}

export const login = async (name: string, password: string) => {
  try {
    const response = await api.post("/login", {
      name,
      password,
    });


    if (response.status === 400) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("token", response.data.token);

    window.location.href = "/";
  } catch (error) {
    throw new Error("An error occurred" + error);
  }
}