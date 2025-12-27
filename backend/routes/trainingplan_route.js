const express = require("express");
const {
  generateHalfMarathonPlan,
} = require("../services/trainingplan");

const router = express.Router();

router.get("/", (req, res) => {
  const { raceDate, level, weeks } = req.query;

  // Basic validation
  if (!raceDate || !level || !weeks) {
    return res.status(400).json({
      error: "Missing required query parameters",
    });
  }

  try {
    const plan = generateHalfMarathonPlan(
      raceDate,
      level,
      Number(weeks)
    );

    res.json(plan);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;