const express = require("express");
const router = express.Router();
const { getWeather, getWeatherByCoords } = require("../controllers/weatherController");

router.get("/", getWeather);
router.get("/coords", getWeatherByCoords); // for current location

module.exports = router;