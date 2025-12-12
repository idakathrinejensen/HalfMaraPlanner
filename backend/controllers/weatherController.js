import weatherService from "../services/weatherService";

async function getWeather(req, res, next) {
  try {
    const city = req.query.city || "Copenhagen";
    const data = await weatherService.getWeatherByCity(city);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getWeather };