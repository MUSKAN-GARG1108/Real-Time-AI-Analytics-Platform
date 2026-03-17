const express = require("express");

const router = express.Router();

let liveMetrics = {
  total_events: 0,
  total_revenue: 0,
  active_users: new Set(),
  top_product: {}
};

router.post("/event", (req, res) => {

  const { user_id, product, price } = req.body;

  liveMetrics.total_events += 1;
  liveMetrics.total_revenue += price;

  liveMetrics.active_users.add(user_id);

  if (!liveMetrics.top_product[product]) {
    liveMetrics.top_product[product] = 0;
  }
  liveMetrics.top_product[product] += 1;

  const topProduct = Object.keys(liveMetrics.top_product)
    .reduce((a, b) =>
      liveMetrics.top_product[a] > liveMetrics.top_product[b] ? a : b
    );

  const responseMetrics = {
    total_events: liveMetrics.total_events,
    total_revenue: liveMetrics.total_revenue,
    active_users: liveMetrics.active_users.size,
    top_product: topProduct
  };

  // 🔥 Send real-time update
  const io = req.app.get("io");
  io.emit("metrics-update", responseMetrics);

  res.json(responseMetrics);
});

module.exports = router;