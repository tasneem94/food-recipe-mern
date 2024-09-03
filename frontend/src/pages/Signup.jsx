import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <br />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />

      <label>Username:</label>
      <br />
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />

      <label>Password:</label>
      <br />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
