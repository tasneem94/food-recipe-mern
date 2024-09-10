import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Navbar from "./components/Navbar";
import { ScrollToTopBtn } from "./components/ScrollToTopBtn";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import { useAuthContext } from "./hooks/useAuthContext";
import UserFavorites from "./pages/UserFavorites";

function App() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async user fetching or any initialization
    const checkUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#00bfff" height={50} width={50} />{" "}
      </div>
    );
  return (
    <div className="pt-16 sm:pt-28 lg:text-lg">
      <Navbar />
      <div className="px-10 lg:px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/favorites"
            element={user ? <UserFavorites /> : <Favorites />}
          />
          <Route path="/item-details/:id" element={<Details />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-profile"
            element={user ? <EditProfile /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <ScrollToTopBtn />
    </div>
  );
}

export default App;
