import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useEditProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  const editProfile = async (email, username, password) => {
    const { setItem } = useLocalStorage("user");
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_URL}/user/edit-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, username, password }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      // save the updated user data to local storage
      setItem(data);

      // update the auth context
      dispatch({ type: "UPDATE_PROFILE", payload: data });

      setIsLoading(false);

      return true;
    }
  };

  return { editProfile, isLoading, error };
};
