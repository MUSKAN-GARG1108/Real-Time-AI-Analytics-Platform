const express = require("express");

const router = express.Router();

let liveMetrics = {
  total_events: 0,
  total_revenue: 0,
  active_users: new Set(),
  productCounts: {},
  revenueHistory: []
};
// let liveMetrics = req.app.get("liveMetrics");

router.post("/event", (req, res) => {

  const { user_id, product, price } = req.body;

  const now = new Date().toLocaleTimeString();

  // Update metrics
  liveMetrics.total_events += 1;
  liveMetrics.total_revenue += price;
  liveMetrics.active_users.add(user_id);

  // Product count
  if (!liveMetrics.productCounts[product]) {
    liveMetrics.productCounts[product] = 0;
  }
  liveMetrics.productCounts[product] += 1;

  // Revenue trend
  liveMetrics.revenueHistory.push({
    time: now,
    revenue: liveMetrics.total_revenue
  });

  // Keep last 10 points only
  if (liveMetrics.revenueHistory.length > 10) {
    liveMetrics.revenueHistory.shift();
  }

  const topProduct = Object.keys(liveMetrics.productCounts)
    .reduce((a, b) =>
      liveMetrics.productCounts[a] > liveMetrics.productCounts[b] ? a : b
    );

  const responseMetrics = {
    total_events: liveMetrics.total_events,
    total_revenue: liveMetrics.total_revenue,
    active_users: liveMetrics.active_users.size,
    top_product: topProduct
  };

  // Convert productCounts → chart format
  const productChart = Object.keys(liveMetrics.productCounts).map(p => ({
    product: p,
    sales: liveMetrics.productCounts[p]
  }));

  const io = req.app.get("io");

  // Emit EVERYTHING
  io.emit("metrics-update", {
    metrics: responseMetrics,
    revenueData: liveMetrics.revenueHistory,
    productData: productChart
  });

  req.app.set("liveMetrics", liveMetrics);
  
  res.json(responseMetrics);
});

module.exports = router;