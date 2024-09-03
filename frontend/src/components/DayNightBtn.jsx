import ReactSwitch from "react-switch";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const DayNightBtn = () => {
  const { setItem, getItem, removeItem } = useLocalStorage("isDarkMode");

  const [isChecked, setIsChecked] = useState(getItem() || false);
  const hanadleChecked = () => {
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
    <ReactSwitch
      checked={isChecked}
      onChange={hanadleChecked}
      checkedIcon={
        <div className="flex items-center justify-center h-full">
          <FontAwesomeIcon icon={faMoon} className="text-[#ffdb57] text-lg" />
        </div>
      }
      uncheckedIcon={
        <div className="flex items-center justify-center h-full">
          <FontAwesomeIcon icon={faSun} className="text-[#FFD43B] text-lg" />
        </div>
      }
      handleDiameter={20}
      onHandleColor="#e0e0e0"
      offHandleColor="#fff"
      onColor="#71797E"
      offColor="#A9A9A9"
    />
  );
};
