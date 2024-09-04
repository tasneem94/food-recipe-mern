// import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";

// const Login = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, error, isLoading } = useLogin();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await login(identifier, password);
//   };

//   return (
//     <form className="login" onSubmit={handleSubmit}>
//       <h3>Log In</h3>

//       <label>Username / Email</label>
//       <br />

//       <input
//         type="text"
//         onChange={(e) => setIdentifier(e.target.value)}
//         value={identifier}
//       />
//       <br />

//       <label>Password:</label>
//       <br />

//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//       />
//       <br />

//       <button disabled={isLoading}>Log in</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default Login;

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  };

  return (
    <form
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-lg mx-auto my-10"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
        Log In
      </h3>

      <div className="mb-4">
        <label
          htmlFor="identifier"
          className="block text-gray-600 dark:text-gray-300 mb-2"
        >
          Username / Email:
        </label>
        <input
          type="text"
          id="identifier"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600"
          onChange={(e) => setIdentifier(e.target.value)}
          value={identifier}
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
        Log in
      </button>

      {error && (
        <div className="mt-4 text-red-500 bg-red-200/30 dark:bg-red-900/20 p-2 rounded-md text-center">
          {error}
        </div>
      )}

      <div className="flex items-center justify-center mt-4 text-gray-700 dark:text-gray-300">
        Haven't registered yet?
        <NavLink
          to={"/signup"}
          className="text-green-500 hover:text-green-600 font-bold duration-200 cursor-pointer mx-1"
        >
          Signup
        </NavLink>
        instead.
      </div>
    </form>
  );
};

export default Login;
