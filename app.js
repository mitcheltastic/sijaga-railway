const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http"); // Required to create an HTTP server
require("dotenv").config();

const { initSocket } = require("./socket"); // Import Socket.IO initializer

// Initialize background jobs
require("./jobs/lockedStatusCleanup");

// Sijaga routes
const userRoutes = require("./routes/userAuthRoute");
const sendIdCardRoutes = require("./routes/sendCardIdRoute");
const userNeeds = require("./routes/userRoute");
const usageHistory = require("./routes/usageHistoryRoutes");
const availabilityStatus = require("./routes/availabilityRoutes");

const app = express(); // Express app instance
const server = http.createServer(app); // HTTP server instance

// Initialize Socket.IO
initSocket(server); // Pass the server instance to Socket.IO

// CORS setup
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight OPTIONS requests

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// API Routes
app.use("/user", userRoutes);
app.use("/card-id", sendIdCardRoutes);
app.use("/user-ess", userNeeds);
app.use("/history", usageHistory);
app.use("/availability", availabilityStatus);

app.get("/", (req, res) => {
  res.send("This is SiJaga API!");
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Resource not found",
  });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: "Internal server error",
  });
});

module.exports = { app, server }; // Export both app and server
