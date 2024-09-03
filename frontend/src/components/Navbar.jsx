import { useContext } from "react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { DayNightBtn } from "./DayNightBtn";
import ScrollToTopBtn from "./ScrollToTopBtn";
const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  return (
    <nav className=" flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <div className="text-2xl lg:text-3xl text-green-700 dark:text-sky-600 font-semibold tracking-wider ">
        <NavLink to={"/"} className="cursor-pointer">
          FOOD RECIPE
        </NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search Recipe..."
          className="bg-white/75 dark:bg-slate-600  px-8 py-3 rounded-full outline-none lg:w-96 shadow-lg shadow-gray-200 dark:shadow-gray-700 focus:shadow-gray-300  dark:focus:shadow-gray-800"
        />
      </form>
      <ul className="flex gap-5 lg:mr-3">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-200 cursor-pointer"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-200 cursor-pointer"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
      <div className="fixed top-8 right-4 lg:top-11 z-50">
        <DayNightBtn />
      </div>
      <ScrollToTopBtn />
    </nav>
  );
};

export default Navbar;
