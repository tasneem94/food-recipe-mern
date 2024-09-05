import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import { useAuthContext } from "./hooks/useAuthContext";

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
        {/* You can customize type, color, height, and width */}
      </div>
    );
  return (
    <div className="px-10 lg:px-20 lg:text-lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
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
  );
}

export default App;
