import React, { useState } from "react";
import API from "../services/api";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await API.post("/auth/signup", { email, password });

    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Signup</h1>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;