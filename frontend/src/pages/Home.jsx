import RecipeList from "../components/RecipeList";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ReactLoading from "react-loading";

const Home = () => {
  const { recipeList, loading, error } = useGlobalContext();
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <ReactLoading type="spin" color="#00bfff" height={50} width={50} />
        <p className="text-xl lg:text-2xl font-bold mt-5">
          Loading... Please wait.
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-xl lg:text-4xl text-center font-bold mt-20">
        Ooops! {error}
      </div>
    );
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeList key={item.id} item={item} />)
      ) : (
        <div className="text-xl lg:text-4xl text-center font-bold mt-20">
          No item found.
          <br /> Search something different, maybe?
        </div>
      )}
    </div>
  );
};
export default Home;
