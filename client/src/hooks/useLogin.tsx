import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(username: string, password: string) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(json.error);
    }
  }

  return { login, isLoading, error };
}
