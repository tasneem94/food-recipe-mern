import { useAuthContext } from "./useAuthContext";
import { useGlobalContext } from "./useGlobalContext";
import { useLocalStorage } from "./useLocalStorage";

export const useLogout = () => {
  const { removeItem } = useLocalStorage("user");
  const { clearFavorites } = useGlobalContext();
  const { dispatch } = useAuthContext();
  //   const { dispatch: blogsDispatch } = useBlogsContext();

  const logout = () => {
    //remove user from the storage
    removeItem();

    //clear favorites
    clearFavorites();

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
