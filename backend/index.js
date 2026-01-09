
const express = require("express");
const app = express();
const port = 3000;
const trainingPlanRoutes = require("./routes/trainingplan_route");


require("dotenv").config(); // retrieving API key

// Middleware to handle JSON
app.use(express.json());
//trainingPlan route
app.use("/api/training-plan", trainingPlanRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Hello from your Node.js + Express backend!");
});

// weather route
const weatherRoute = require("./routes/weatherRoute");
app.use("/weather", weatherRoute);

// basic error handler (so errors return JSON)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Server error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});