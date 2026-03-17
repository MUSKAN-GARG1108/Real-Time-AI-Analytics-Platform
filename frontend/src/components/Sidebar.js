import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#111",
      color: "#fff",
      padding: "20px"
    }}>

      <h2>InsightFlow</h2>

      <div style={{ marginTop: "30px" }}>
        <p><Link to="/" style={{ color: "#fff" }}>Projects</Link></p>
        <p><Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link></p>
        <p><Link to="/upload" style={{ color: "#fff" }}>Upload Data</Link></p>
        <p><Link to="/events" style={{ color: "#fff" }}>Live Events</Link></p>
        <p><Link to="/insights" style={{ color: "#fff" }}>Insights</Link></p>
      </div>

    </div>
  );
}

export default Sidebar;