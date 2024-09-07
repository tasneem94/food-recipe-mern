import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { commonSearchParam } from "../data/commonSearchParam";

export const GlobalContext = createContext(null);

const randomSearchParam =
  commonSearchParam[Math.floor(Math.random() * commonSearchParam.length)];

export const GlobalContextProvider = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const fetchRecipes = async (queryParam) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${queryParam}`
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        setError(null);
      } else {
        setRecipeList([]);
        setError("No recipes found.");
      }
    } catch (e) {
      console.log(e);
      setError(e.message || "Something went wrong.");
      setRecipeList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (searchParam.trim() !== "") {
      fetchRecipes(searchParam);
      navigate("/");
    }
  };

  const handleAddToFavorites = (currentRecipe) => {
    const copyFavoritesList = [...favoritesList];
    const recipeIndex = copyFavoritesList.findIndex(
      (recipe) => recipe.id === currentRecipe.id
    );
    if (recipeIndex === -1) {
      copyFavoritesList.push(currentRecipe);
    } else {
      copyFavoritesList.splice(recipeIndex, 1);
    }
    setFavoritesList(copyFavoritesList);
    console.log(favoritesList);
  };

  const handleClickOutside = (event) => {
    // console.log(dropdownRef.current, isDropdownOpen);

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    fetchRecipes(randomSearchParam);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        error,
        recipeList,
        setRecipeList,
        recipeDetails,
        setRecipeDetails,
        favoritesList,
        handleAddToFavorites,
        isDropdownOpen,
        setIsDropdownOpen,
        dropdownRef,
        handleClickOutside,
        isMenuOpen,
        setIsMenuOpen,
        menuRef,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
