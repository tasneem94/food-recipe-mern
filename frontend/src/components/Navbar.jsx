import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { DayNightBtn } from "./DayNightBtn";
import { DayNightBtnAlt } from "./DayNightBtnAlt";
import { DropDown } from "./DropDown";
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
    isMenuOpen,
    setIsMenuOpen,
    dropdownRef,
    menuRef,
    handleClickOutside,
  } = useGlobalContext();
  const [showSearch, setShowSearch] = useState("false");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.innerWidth < 640) {
      if (window.scrollY > lastScrollY) {
        // Scrolling down, hide the navbar
        setShowNavbar(false);
      } else {
        // Scrolling up, show the navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    } else {
      setShowNavbar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-[rgb(248,248,255)] dark:bg-black flex flex-row justify-between items-center px-10 lg:px-20 pt-8 pb-4 shadow-sm mx-auto gap-5 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div
        className={`flex items-center ${!showSearch ? "hidden" : ""} sm:flex`}
      >
        {/* Hamburger Icon */}
        <div ref={menuRef} className="mr-5 lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl sm:text-2xl text-gray-900 dark:text-gray-200"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="lg:mx-0 text-xl text-center sm:text-2xl md:text-2xl lg:text-3xl text-green-700 dark:text-sky-600 font-semibold  sm:tracking-wider">
          <NavLink to={"/"} className="cursor-pointer">
            FOOD RECIPE
          </NavLink>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative hidden sm:flex items-center "
      >
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search..."
          className="bg-white/75 dark:bg-gray-700 text-sm sm:text-lg px-11  py-1 sm:py-3 rounded-full outline-none shadow-lg shadow-gray-200 dark:shadow-gray-800 focus:shadow-gray-300 dark:focus:shadow-gray-900 pr-10 sm:w-48 md:w-60 lg:w-72 xl:w-96"
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
          className="hidden sm:block absolute left-5 cursor-pointer text-gray-500 dark:text-gray-300"
          onClick={handleSubmit}
        />
      </form>

      <div className="flex gap-2">
        {/* Regular Nav Items (Visible on lg and larger) */}
        <ul className="hidden lg:flex gap-5 lg:mr-3">
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

        {/* User and Theme Toggle (Always Visible) */}
        <ul
          className={` ${
            !showSearch ? "hidden" : ""
          } flex items-center gap-5 sm:gap-5 lg:mr-3 text-base sm:text-lg sm:flex`}
        >
          <li className="sm:hidden text-xl">
            {/* search option for smaller than sm */}
            <FaSearch
              onClick={() => {
                setShowSearch((prevShowSearch) => !prevShowSearch);
              }}
            />
          </li>
          <li>
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
                className="bg-green-500/20 dark:bg-sky-500/40 px-2 py-1 rounded-md text-gray-800 hover:text-gray-600 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
              >
                Login
              </NavLink>
            )}
          </li>
          <li>
            {/* This will show on small screens */}
            <div className="block sm:hidden">
              <DayNightBtnAlt />
            </div>

            {/* This will show on screens larger than 640px (sm and above) */}
            <div className="hidden sm:block">
              <DayNightBtn />
            </div>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu (Only Visible on smaller than lg screens) */}
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="lg:hidden absolute top-16 left-0 bg-white dark:bg-gray-800 w-40 p-4 shadow-lg z-10"
        >
          <li className="mb-3">
            <NavLink
              to={"/"}
              className="text-gray-800 hover:text-gray-600 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={"/favorites"}
              className="text-gray-800 hover:text-gray-600 dark:text-white/90 dark:hover:text-white/80 duration-100 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      )}

      {/* searchbar only visisble for screen smaller than sm */}
      {!showSearch && (
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full sm:hidden "
        >
          <div className="flex items-center relative w-72">
            <FaTimes
              className="absolute right-9 cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={() => {
                setSearchParam("");
                setShowSearch((prevShowSearch) => !prevShowSearch);
              }}
            />

            <input
              type="text"
              name="search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              placeholder="Search..."
              className="bg-white/75 dark:bg-gray-700 text-base px-11 py-1 rounded-full outline-none shadow-lg shadow-gray-200 dark:shadow-gray-800 focus:shadow-gray-300 dark:focus:shadow-gray-900 pr-10 "
            />
            <FaSearch
              className="absolute left-3 cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={handleSubmit}
            />
          </div>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
