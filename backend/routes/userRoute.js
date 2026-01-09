// user route

const express = require("express");
const { loginUser, registerUser, saveTrainingPlan, getTrainingPlan} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.post("/:id/training-plan", saveTrainingPlan);
router.get("/:id/training-plan", getTrainingPlan);

module.exports = router;