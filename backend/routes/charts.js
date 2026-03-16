const express = require("express");

const router = express.Router();

router.get("/revenue-chart", (req, res) => {

  const data = [
    { time: "10:00", revenue: 200 },
    { time: "11:00", revenue: 400 },
    { time: "12:00", revenue: 800 },
    { time: "13:00", revenue: 1200 },
    { time: "14:00", revenue: 1600 }
  ];

  res.json(data);
});

router.get("/products-chart", (req, res) => {

  const data = [
    { product: "iPhone", sales: 400 },
    { product: "MacBook", sales: 300 },
    { product: "iPad", sales: 200 },
    { product: "AirPods", sales: 100 }
  ];

  res.json(data);
});

module.exports = router;