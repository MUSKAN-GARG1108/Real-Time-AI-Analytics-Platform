const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      let liveMetrics = {
        total_events: 0,
        total_revenue: 0,
        active_users: new Set(),
        productCounts: {},
        revenueHistory: [],
      };
      // let liveMetrics = req.app.get("liveMetrics");

      results.forEach((row) => {
        const price = Number(row.amount || 0);
        const product = row.product;
        const user = row.user_id;

        liveMetrics.total_events += 1;
        liveMetrics.total_revenue += price;
        liveMetrics.active_users.add(user);

        if (!liveMetrics.productCounts[product]) {
          liveMetrics.productCounts[product] = 0;
        }

        liveMetrics.productCounts[product] += 1;

        liveMetrics.revenueHistory.push({
          time: row.timestamp,
          revenue: liveMetrics.total_revenue,
        });
      });

      const topProduct = Object.keys(liveMetrics.productCounts).reduce(
        (a, b) =>
          liveMetrics.productCounts[a] > liveMetrics.productCounts[b] ? a : b,
      );

      const responseMetrics = {
        total_events: liveMetrics.total_events,
        total_revenue: liveMetrics.total_revenue,
        active_users: liveMetrics.active_users.size,
        top_product: topProduct,
      };

      const productChart = Object.keys(liveMetrics.productCounts).map((p) => ({
        product: p,
        sales: liveMetrics.productCounts[p],
      }));

      // 🔥 SAVE globally
      req.app.set("liveMetrics", liveMetrics);

      const io = req.app.get("io");

      // 🔥 EMIT TO DASHBOARD
      io.emit("metrics-update", {
        metrics: responseMetrics,
        revenueData: liveMetrics.revenueHistory,
        productData: productChart,
      });

      res.json({ message: "File processed successfully" });
    });
});

module.exports = router;
