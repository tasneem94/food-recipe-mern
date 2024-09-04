import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { DayNightBtn } from "./DayNightBtn";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { searchParam, setSearchParam, handleSubmit } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
          >
            Favorites
          </NavLink>
        </li>

        {!user && (
          <li>
            <NavLink
              to={"/signup"}
              className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
            >
              Signup
            </NavLink>
          </li>
        )}
        {/* {user && (
          <>
            <li className="duration-200">{user.username}</li>
            <li>
              <button
                className="text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-200 cursor-pointer"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </li>
          </>
        )} */}
        {user && (
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-200 cursor-pointer"
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
                <li className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 break-all duration-100">
                  <FaUser className="text-lg flex-shrink-0" /> {user.username}
                </li>
                <li className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 duration-100">
                  <FaEnvelope className="text-lg flex-shrink-0" /> {user.email}
                </li>
                <li className="dark:border-gray-700">
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className=" flex items-center gap-2 w-full text-left px-4 py-2 text-black hover:text-gray-700 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
                  >
                    <FaSignOutAlt className="text-lg flex-shrink-0" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
      <div className="fixed top-8 right-4 lg:top-11 z-50">
        <DayNightBtn />
      </div>
      <ScrollToTopBtn />
    </nav>
  );
};

export default Navbar;
