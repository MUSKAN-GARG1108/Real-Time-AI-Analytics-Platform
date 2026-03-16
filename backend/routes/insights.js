const express = require("express");

const router = express.Router();

router.get("/insights", (req, res) => {

  const insights = [
    { text: "Revenue increased by 20% today." },
    { text: "iPhone is the top selling product." }
  ];

  res.json(insights);
});

module.exports = router;