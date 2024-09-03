import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const { recipeList, loading, error } = useContext(GlobalContext);
  if (loading) {
    return (
      <div className="text-xl lg:text-4xl text-center font-bold">
        Loading...Please wait.
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-xl lg:text-4xl text-center font-bold">
        Ooops! {error}
      </div>
    );
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeList item={item} />)
      ) : (
        <div className="text-xl lg:text-4xl text-center font-bold">
          No item found.
          <br /> Search something different, maybe?
        </div>
      )}
    </div>
  );
};
export default Home;
