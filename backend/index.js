
const express = require("express");
const app = express();
const port = 3000;
const trainingPlanRoutes = require("./routes/trainingplan_route");


// Middleware to handle JSON
app.use(express.json());
//trainingPlan route
app.use("/api/training-plan", trainingPlanRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Hello from your Node.js + Express backend!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});