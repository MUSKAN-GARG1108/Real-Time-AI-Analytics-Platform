import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import ProductsChart from "../components/ProductsChart";

const socket = io("http://localhost:5000");

function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Initial metrics
    axios
      .get("http://localhost:5000/metrics")
      .then((res) => setMetrics(res.data));

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    // Real-time updates
    socket.on("metrics-update", (data) => {
      setMetrics(data.metrics);
      setRevenueData(data.revenueData);
      setProductData(data.productData);
    });

    return () => socket.off("metrics-update");
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Live Analytics Dashboard</h1>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <MetricCard title="Total Events" value={metrics.total_events} />
        <MetricCard title="Revenue" value={metrics.total_revenue} />
        <MetricCard title="Active Users" value={metrics.active_users} />
        <MetricCard title="Top Product" value={metrics.top_product} />
      </div>

      {/* Charts */}
      <h2>Revenue Trend</h2>
      <RevenueChart data={revenueData} />

      <h2 style={{ marginTop: "40px" }}>Top Products</h2>
      <ProductsChart data={productData} />
    </div>
  );
}

export default Dashboard;
