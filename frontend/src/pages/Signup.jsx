import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { NavLink } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, username, password);
  };

  return (
    <form
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-lg mx-auto my-10"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
        Sign Up
      </h3>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-600 dark:text-gray-300 mb-2"
        >
          Email address:
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
          Username:
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
          Password:
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
            : "bg-green-500 hover:bg-green-600 focus:outline-none focus:bg-green-600"
        }`}
        disabled={isLoading}
      >
        Sign up
      </button>

      {error && (
        <div className="mt-4 text-red-500 bg-red-200/30 dark:bg-red-900/20 p-2 rounded-md text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-4 text-gray-700 dark:text-gray-300">
        <div>Already a user? </div>
        <div>
          <NavLink
            to={"/Login"}
            className="text-green-500 hover:text-green-600 font-bold duration-200 cursor-pointer mx-1"
          >
            Login
          </NavLink>{" "}
          instead.
        </div>
      </div>
    </form>
  );
};

export default Signup;
