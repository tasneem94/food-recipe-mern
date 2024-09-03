import { useAuthContext } from "./useAuthContext";
import { useLocalStorage } from "./useLocalStorage";
// import { useBlogsContext } from "./useBlogsContext";

export const useLogout = () => {
  const { removeItem } = useLocalStorage("user");
  const { dispatch } = useAuthContext();
  //   const { dispatch: blogsDispatch } = useBlogsContext();

  const logout = () => {
    //remove user from the storage
    removeItem();

    //dispatch logout action
    dispatch({ type: "LOGOUT" });

    // blogsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
