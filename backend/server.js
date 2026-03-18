const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Make io accessible in routes
app.set("io", io);

const uploadRoute = require("./routes/upload");
const insightsRoute = require("./routes/insights");
const chartRoutes = require("./routes/charts");
const eventRoute = require("./routes/events");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");


app.use(uploadRoute);
app.use(insightsRoute);
app.use(chartRoutes);
app.use(eventRoute);
app.use(authRoutes);
app.use(projectRoutes);

// app.set("liveMetrics", {
//   total_events: 0,
//   total_revenue: 0,
//   active_users: new Set(),
//   productCounts: {},
//   revenueHistory: []
// });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});