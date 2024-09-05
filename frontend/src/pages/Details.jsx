import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ReactLoading from "react-loading";
const Details = () => {
  const [loading, setLoading] = useState(true);
  const {
    recipeDetails,
    setRecipeDetails,
    handleAddToFavorites,
    favoritesList,
  } = useGlobalContext();
  const { id } = useParams();

  const getRecipeDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeDetails(data.data);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <ReactLoading type="spin" color="#00bfff" height={50} width={50} />
        <p className="text-xl lg:text-2xl font-bold mt-5">
          Loading Recipe Details... Please wait.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto ">
        <div className="h-96 overflow-hidden rounded-xl  group">
          <img
            src={recipeDetails?.recipe?.image_url}
            alt="img"
            className="w-full h-full object-cover group-hover:scale-105 duration-300 dark:opacity-90 dark:grayscale-[10%]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 dark:text-cyan-600 font-medium">
          {recipeDetails?.recipe?.publisher}
        </span>
        <div className="text-3xl font-bold truncate">
          {recipeDetails?.recipe?.title}
        </div>
        <div>
          <button
            onClick={() => handleAddToFavorites(recipeDetails?.recipe)}
            className="px-8 py-3 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white hover:bg-gray-800 dark:bg-slate-800 dark:text-white/90 dark:hover:bg-slate-900"
          >
            {favoritesList.findIndex(
              (favRecipe) => favRecipe.id === recipeDetails?.recipe.id
            ) === -1
              ? "Add to favorites"
              : "Remove from favorites"}
          </button>
        </div>
        <div>
          <div className="text-2xl font-bold text-cyan-900 dark:text-cyan-500 mb-3">
            Ingredients:
          </div>
          <ul className="flex flex-col gap-3">
            {recipeDetails?.recipe?.ingredients.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
