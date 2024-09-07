import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../hooks/useGlobalContext";

export const DayNightBtnAlt = () => {
  const { setItem, getItem } = useLocalStorage("isDarkMode");
  const { isChecked, setIsChecked } = useGlobalContext();
  setIsChecked(getItem() || false);

  const handleToggle = () => {
    setIsChecked((prevState) => {
      const newIsChecked = !prevState;
      document.body.classList.toggle("dark", newIsChecked);
      setItem(newIsChecked);
      return newIsChecked;
    });
  };

  useEffect(() => {
    const storedTheme = getItem();
    if (storedTheme !== null) {
      setIsChecked(storedTheme);
      document.body.classList.toggle("dark", storedTheme);
    }
  }, []);

  return (
    <button onClick={handleToggle} className="text-xl">
      <FontAwesomeIcon
        icon={isChecked ? faSun : faMoon}
        className={`${isChecked ? "text-[#FFD43B]" : "text-[#F4C430]"}`}
      />
    </button>
  );
};
