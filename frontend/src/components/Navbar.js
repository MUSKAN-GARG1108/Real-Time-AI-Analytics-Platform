import React from "react";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{
      height: "60px",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      borderBottom: "1px solid #ddd"
    }}>
      <h3>Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;