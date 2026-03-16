import React, { useEffect, useState } from "react";
import axios from "axios";

function Insights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/insights")
      .then(res => setInsights(res.data));
  }, []);

  return (
    <div>
      <h1>AI Insights</h1>

      {insights.map((insight, index) => (
        <p key={index}>{insight.text}</p>
      ))}
    </div>
  );
}

export default Insights;