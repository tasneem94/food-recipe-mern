import RecipeList from "../components/RecipeList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ReactLoading from "react-loading";

const UserFavorites = () => {
  const { user } = useAuthContext();
  //   const [favoritesList, setFavoritesList] = useState();
  const { favoritesList, setFavoritesList } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await fetch(
            `${import.meta.env.VITE_URL}/user/favorites`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setFavoritesList(data);
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Failed to fetch favorites.");
          }
        } catch (error) {
          setError("Error fetching favorites.");
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user, setFavoritesList]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <ReactLoading type="spin" color="#00bfff" height={50} width={50} />
        <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-5">
          Loading Favorites... Please wait.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 text-xl lg:text-4xl text-center font-bold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeList key={item.id} item={item} />)
      ) : (
        <div className="mt-12 text-xl lg:text-4xl text-center font-bold">
          No favorite item found.
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
