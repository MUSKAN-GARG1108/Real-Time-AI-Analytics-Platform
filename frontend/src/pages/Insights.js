import React, { useEffect, useState } from "react";
import axios from "axios";

function Insights() {

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();

    const interval = setInterval(fetchInsights, 5000); // auto refresh

    return () => clearInterval(interval);
  }, []);

  const fetchInsights = async () => {
    const res = await axios.get("http://localhost:5000/insights");
    setInsights(res.data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Insights</h1>

      {insights.map((insight, index) => (
        <div key={index} style={{
          background: "#222",
          color: "#fff",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          {insight}
        </div>
      ))}

    </div>
  );
}

export default Insights;