import { useState } from "react";
import { useEditProfile } from "../hooks/useEditProfile";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { editProfile, error, isLoading } = useEditProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(email, username, password);
    navigate("/");
  };

  return (
    <form
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-lg mx-auto my-10"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
        Edit Profile
      </h3>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-600 dark:text-gray-300 mb-2"
        >
          Change Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-600 dark:text-gray-300 mb-2"
        >
          Change Username:
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-600 dark:text-gray-300 mb-2"
        >
          Change Password:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 text-white rounded-lg ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 dark:bg-orange-800 dark:hover:bg-orange-700 focus:outline-none focus:bg-orange-600"
        }`}
        disabled={isLoading}
      >
        Edit
      </button>

      {error && (
        <div className="mt-4 text-red-500 bg-red-200/30 dark:bg-red-900/20 p-2 rounded-md text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default EditProfile;
