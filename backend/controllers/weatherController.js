import weatherService from "../services/weatherService";

export async function getWeather(req, res, next) {
  try {
    const city = req.query.city;
    const data = await weatherService.getWeatherByCity(city);
    res.json(data);
  } catch (err) {
    next(err);
  }
}