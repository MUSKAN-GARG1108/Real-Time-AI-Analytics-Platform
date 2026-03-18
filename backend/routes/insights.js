const express = require("express");
const router = express.Router();

// reuse same memory (simple approach)
let lastRevenue = 0;

router.get("/insights", (req, res) => {

  const liveMetrics = req.app.get("liveMetrics");

  if (!liveMetrics) {
    return res.json(["No data available yet"]);
  }

  const insights = [];

  const totalRevenue = liveMetrics.total_revenue;
  const totalEvents = liveMetrics.total_events;

  // 1️⃣ Revenue spike detection
  if (lastRevenue > 0) {
    const change = ((totalRevenue - lastRevenue) / lastRevenue) * 100;

    if (change > 20) {
      insights.push(`🚀 Revenue increased by ${change.toFixed(2)}% recently`);
    } else if (change < -20) {
      insights.push(`⚠️ Revenue dropped by ${Math.abs(change).toFixed(2)}%`);
    }
  }

  lastRevenue = totalRevenue;

  // 2️⃣ Top product insight
  const topProduct = Object.keys(liveMetrics.productCounts || {})
    .reduce((a, b) =>
      liveMetrics.productCounts[a] > liveMetrics.productCounts[b] ? a : b,
      null
    );

  if (topProduct) {
    insights.push(`🔥 ${topProduct} is the most popular product`);
  }

  // 3️⃣ Engagement insight
  if (totalEvents > 50) {
    insights.push(`📈 High user activity detected (${totalEvents} events)`);
  }

  if (insights.length === 0) {
    insights.push("No significant insights yet");
  }

  req.app.set("liveMetrics", liveMetrics);
  
  res.json(insights);
});

module.exports = router;