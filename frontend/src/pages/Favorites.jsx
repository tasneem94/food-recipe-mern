import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import RecipeList from "../components/RecipeList";

const Favorites = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeList item={item} />)
      ) : (
        <div className="text-xl lg:text-4xl text-center font-bold">
          No favorite item found.
        </div>
      )}
    </div>
  );
};
export default Favorites;
