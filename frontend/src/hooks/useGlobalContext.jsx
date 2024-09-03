import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw Error("useGlobal must be used inside an GlobalContextProvider");
  }

  return context;
};
