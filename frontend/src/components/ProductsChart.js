import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function ProductsChart({ data }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="product" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sales" fill="#82ca9d" />
    </BarChart>
  );
}

export default ProductsChart;