import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded credentials
    const validEmail = "admin";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      // If credentials match, log the user in
      const token = "sample-auth-token";
      dispatch(login(token)); // Dispatch login action with a token
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      // If credentials don't match, show an error
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
