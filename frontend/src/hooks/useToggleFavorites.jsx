import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLocalStorage } from "./useLocalStorage";
export const useToggleFavorites = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  const toggleFavorites = async (recipe) => {
    const { setItem } = useLocalStorage("favorites");
    setIsLoading(true);
    setError(null);

    // Extract only the required fields
    const favoriteItem = {
      id: recipe.id,
      publisher: recipe.publisher,
      title: recipe.title,
      image_url: recipe.image_url,
    };

    const response = await fetch(`${import.meta.env.VITE_URL}/user/favorites`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(favoriteItem),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      // Update the local storage and context with the new favorites list
      setItem(data); // Assuming `data` contains updated user info
      dispatch({ type: "UPDATE_FAVORITES", payload: data.favorites });
      setIsLoading(false);

      return true;
    }
  };

  return { toggleFavorites, isLoading, error };
};
