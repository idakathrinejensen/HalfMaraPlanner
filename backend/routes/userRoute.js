// user route

const express = require("express");
const { loginUser, registerUser, getTrainingPlan, markWorkoutComplete} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/:id/training-plan", getTrainingPlan);
router.post("/:id/complete", markWorkoutComplete);

module.exports = router;