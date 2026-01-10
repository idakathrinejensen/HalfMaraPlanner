const weatherService = require("../services/weatherService");

async function getWeather(req, res, next) {
  try {
    const city = req.query.city || "Milan";
    const data = await weatherService.getWeatherByCity(city);
    res.json(data);
  } catch (err) {
    next(err);
  }
}


async function getWeatherByCoords(req, res, next) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      const err = new Error("Missing lat or lon");
      err.status = 400;
      throw err;
    }

    const data = await weatherService.getWeatherByCoords(
      Number(lat),
      Number(lon)
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getWeather, getWeatherByCoords };
