
const express = require("express");
const app = express();
const port = 3000;


require("dotenv").config(); // retrieving API key

// Middleware to handle JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from your Node.js + Express backend!");
});

// weather route
const weatherRoute = require("./routes/weatherRoute");
app.use("/weather", weatherRoute);

// user route
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

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