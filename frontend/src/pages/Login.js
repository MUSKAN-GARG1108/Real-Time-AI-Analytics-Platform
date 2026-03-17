import React, { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      window.location.href = "/";
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not registered");
      } else if (err.response?.status === 401) {
        setError("Invalid password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {/* 🔥 Error Display */}
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p>{error}</p>

          {error === "User not registered" && (
            <Link to="/signup">Go to Signup</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
