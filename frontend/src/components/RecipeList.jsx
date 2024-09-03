import { Link } from "react-router-dom";

const RecipeList = ({ item }) => {
  return (
    <div className="flex flex-col w-80 overflow-hidden bg-white/75 dark:bg-slate-800 shadow-xl gap-5 p-5 border-2 rounded-2xl border-white dark:border-slate-700">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl dark:opacity-90 dark:grayscale-[10%]">
        <img src={item?.image_url} alt="recipe-item" className="w-full" />
      </div>
      <div>
        <span className="text-sm text-cyan-700 dark:text-cyan-600 font-medium">
          {item?.publisher}
        </span>
        <div className="text-2xl font-bold truncate">{item?.title}</div>
        <Link
          to={`/item-details/${item?.id}`}
          className="text-sm mt-5 px-8 py-3 rounded-lg uppercase font-medium tracking-widest inline-block shadow-md bg-black hover:bg-slate-900 dark:bg-slate-950 dark:hover:black duration-100 text-white"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeList;
