import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_PROFILE":
      return {
        user: {
          ...state.user,
          ...action.payload, // Update the user's profile with new data
        },
      };
    case "UPDATE_FAVORITES":
      return {
        user: {
          ...state.user,
          favorites: action.payload, // Update the user's favorites
        },
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const { getItem } = useLocalStorage("user");
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = getItem();
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
