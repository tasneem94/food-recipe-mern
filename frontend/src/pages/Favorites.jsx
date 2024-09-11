import RecipeList from "../components/RecipeList";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Favorites = () => {
  const { favoritesList } = useGlobalContext();

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

export default Favorites;
