import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import type { NewUserDto } from "../types";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      // "http://localhost:5145/api/user/login",
      "https://patuvest.azurewebsites.net/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      // API returns plain string or object
      setError(
        typeof json === "string" ? json : (json.message ?? "Login failed"),
      );
      return;
    }

    const user: NewUserDto = json;
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
    setIsLoading(false);
  };

  return { login, isLoading, error };
};

//const text = await response.text()
//const json = text ? JSON.parse(text) : null

//if (!response.ok) {
//  setIsLoading(false)

//  let message = 'Login failed'

//  if (typeof json === 'string') {
//    message = json
//  } else if (json?.message) {
//    message = json.message
//  } else if (json?.title) {
//    message = json.title
//  }

//  setError(message)
//  return
//}
