import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { DayNightBtn } from "./DayNightBtn";
import { DropDown } from "./DropDown";
import { ScrollToTopBtn } from "./ScrollToTopBtn";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuthContext();
  const {
    searchParam,
    setSearchParam,
    handleSubmit,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownRef,
    handleClickOutside,
  } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" flex justify-between items-center py-8 container mx-auto flex-col md:flex-row gap-5 lg:gap-0 ">
      {/* Hamburger Icon */}
      <div className="absolute top-8 left-4 lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-gray-900 dark:text-gray-200"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="text-2xl lg:text-3xl text-green-700 dark:text-sky-600 font-semibold tracking-wider">
        <NavLink to={"/"} className="cursor-pointer">
          FOOD RECIPE
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search Recipe..."
          className="bg-white/75 dark:bg-gray-700 px-11 py-3 rounded-full outline-none lg:w-96 shadow-lg shadow-gray-200 dark:shadow-gray-800 focus:shadow-gray-300 dark:focus:shadow-gray-900 pr-10" // Add pr-10 to provide space for the icon
        />
        {searchParam !== "" && (
          <FaTimes
            className="absolute right-5 cursor-pointer text-gray-500 dark:text-gray-300"
            onClick={() => {
              setSearchParam("");
            }}
          />
        )}
        <FaSearch
          className="absolute left-5 cursor-pointer text-gray-500 dark:text-gray-300"
          onClick={handleSubmit}
        />
      </form>
      <ul className="flex gap-5 lg:mr-3">
        <li>
          <NavLink
            to={"/"}
            className="text-gray-800 hover:text-gray-600 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-gray-800 hover:text-gray-600 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
      <div className="fixed flex items-center gap-4 top-8 right-4 lg:top-11 z-50">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-200 cursor-pointer"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            <DropDown />
          </div>
        ) : (
          <NavLink
            to={"/login"}
            className="text-gray-800 hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
          >
            Login
          </NavLink>
        )}
        <DayNightBtn />
      </div>
      <ScrollToTopBtn />
    </nav>
  );
};

export default Navbar;
