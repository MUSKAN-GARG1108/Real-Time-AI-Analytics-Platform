import React, { useEffect, useState } from "react";
import axios from "axios";

import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import ProductsChart from "../components/ProductsChart";

function Dashboard() {

  const [metrics, setMetrics] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/metrics")
      .then(res => setMetrics(res.data));

    axios.get("http://localhost:5000/revenue-chart")
      .then(res => setRevenueData(res.data));

    axios.get("http://localhost:5000/products-chart")
      .then(res => setProductData(res.data));

  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h1>Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <MetricCard title="Total Events" value={metrics.total_events} />
        <MetricCard title="Revenue" value={metrics.total_revenue} />
        <MetricCard title="Active Users" value={metrics.active_users} />
        <MetricCard title="Top Product" value={metrics.top_product} />
      </div>

      <h2>Revenue Trend</h2>
      <RevenueChart data={revenueData} />

      <h2>Top Products</h2>
      <ProductsChart data={productData} />

    </div>
  );
}

export default Dashboard;