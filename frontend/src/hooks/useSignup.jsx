import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, username, password) => {
    const { setItem } = useLocalStorage("user");
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // save the user to local storage
      setItem(data);

      // update the auth context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
