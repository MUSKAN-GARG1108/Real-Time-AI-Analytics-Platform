import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import ProductsChart from "../components/ProductsChart";

const socket = io("http://localhost:5000");

function Dashboard() {

  const [metrics, setMetrics] = useState({});

  useEffect(() => {

    axios.get("http://localhost:5000/metrics")
      .then(res => setMetrics(res.data));

    // Listen for real-time updates
    socket.on("metrics-update", (data) => {
      setMetrics(data);
    });

    return () => socket.off("metrics-update");

  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Live Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <MetricCard title="Total Events" value={metrics.total_events} />
        <MetricCard title="Revenue" value={metrics.total_revenue} />
        <MetricCard title="Active Users" value={metrics.active_users} />
        <MetricCard title="Top Product" value={metrics.top_product} />
      </div>
    </div>
  );
}

export default Dashboard;