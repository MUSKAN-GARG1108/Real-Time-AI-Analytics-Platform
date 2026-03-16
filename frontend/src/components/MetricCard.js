import React from "react";

function MetricCard({ title, value }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      background: "#f9f9f9"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default MetricCard;