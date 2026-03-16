const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const uploadRoute = require("./routes/upload");
const insightsRoute = require("./routes/insights");
const chartRoutes = require("./routes/charts");

app.use(uploadRoute);
app.use(insightsRoute);
app.use(chartRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});