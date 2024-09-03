import { api } from "../lib/axios";



export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/singup", {
      name,
      email,
      password,
    });

    if (response.status === 400) {
      throw new Error("Usuário ou senha invalida");
    }
    window.location.href = "/login";
  } catch (error) {
    throw new Error("Um erro ocorreu!" + error);
  }
}

export const login = async (name: string, password: string) => {
  try {
    const response = await api.post("/login", {
      name,
      password,
    });


    if (response.status === 400) {
      throw new Error("Usuário ou senha invalida");
    }

    localStorage.setItem("token", response.data.token);

    window.location.href = "/";
  } catch (error) {
    throw new Error("Um erro ocorreu!" + error);
  }
}

export const isAuthenticated = async () => {
  try {
    await api.get("/authenticate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

