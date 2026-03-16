const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

let latestMetrics = {};

router.post("/upload-data", upload.single("file"), async (req, res) => {

  console.log("File uploaded:", req.file.filename);

  const filePath = req.file.path;

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  try {

    console.log("Sending file to Python analytics service...");

    const response = await axios.post(
      "http://localhost:6000/process-data",
      formData,
      { headers: formData.getHeaders() }
    );

    console.log("Processing complete. Metrics received.");

    latestMetrics = response.data;

    console.log("Metrics:", latestMetrics);

    res.json({
      message: "Data processed successfully",
      metrics: latestMetrics
    });

  } catch (error) {

    console.error("Error processing file:", error.message);

    res.status(500).json({ error: "Processing failed" });

  }

});

router.get("/metrics", (req, res) => {
  res.json(latestMetrics);
});

module.exports = router;