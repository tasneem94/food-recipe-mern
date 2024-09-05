import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
export const DropDown = () => {
  const { isDropdownOpen, setIsDropdownOpen } = useGlobalContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      {isDropdownOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
          <li className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 break-all duration-100">
            <FaUser className="text-lg flex-shrink-0" /> {user.username}
          </li>
          <li className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 duration-100">
            <FaEnvelope className="text-lg flex-shrink-0" /> {user.email}
          </li>
          <li className=" text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-100 duration-100 cursor-pointer">
            <button
              onClick={() => {
                navigate("/edit-profile");
                setIsDropdownOpen(false);
              }}
              className=" flex items-center gap-2 w-full text-left px-4 py-2 "
            >
              <FaEdit className="text-lg flex-shrink-0" /> Edit profile
            </button>
          </li>
          <li className=" text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-100 duration-100 cursor-pointer">
            <button
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className=" flex items-center gap-2 w-full text-left px-4 py-2 "
            >
              <FaSignOutAlt className="text-lg flex-shrink-0" /> Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
};
