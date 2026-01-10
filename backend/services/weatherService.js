const axios = require("axios"); 

const API_KEY = process.env.OPENWEATHER_API_KEY;
if (!API_KEY) {
  console.warn("Missing OPENWEATHER_API_KEY in backend .env");
}

// helper to get city
async function geocodeCity(city) {
  const url = "https://api.openweathermap.org/geo/1.0/direct";
  const resp = await axios.get(url, { // calling geocoding API
    params: { q: city, limit: 1, appid: API_KEY },
  });

  //error handling
  if (!resp.data?.length) {
    const err = new Error(`Could not geocode city: ${city}`);
    err.status = 400;
    throw err;
  }

  const { lat, lon, name, country } = resp.data[0]; //extract data
  return { lat, lon, name, country };
}

// helper to get the Call 3.0 endpoint
async function getOneCall(lat, lon) {
  const url = "https://api.openweathermap.org/data/3.0/onecall";
  const resp = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric", // celsius
      exclude: "minutely,daily,alerts",// keep hourly so we can read hourly[0].pop for chance of rain
    },
  });
  return resp.data;
}


async function getWeatherByCity(city) {
  const { lat, lon, name, country } = await geocodeCity(city);
  const data = await getOneCall(lat, lon);

  const current = data.current;
  const weather0 = current.weather?.[0];

  const pop0 = data.hourly?.[0]?.pop; // from hourly forecast take first hour and read pop (0-1)
  const precipitationProbability = // convert to %
    typeof pop0 === "number" ? Math.round(pop0 * 100) : null;

  return {
    location: `${name}${country ? `, ${country}` : ""}`,
    temperatureC: Math.round(current.temp),
    windSpeedMs: current.wind_speed,
    windSpeedKmh: Math.round(current.wind_speed * 3.6),
    humidity: current.humidity,
    condition: weather0?.main ?? "Unknown",
    conditionDescription: weather0?.description ?? "",
    precipitationProbability,
    rainMmLastHour: current.rain?.["1h"] ?? 0, // in mm
  };
}

// weather for current location
async function getWeatherByCoords(lat, lon) {
  const data = await getOneCall(lat, lon);

  const current = data.current;
  const weather0 = current.weather?.[0];
  const pop0 = data.hourly?.[0]?.pop; // from hourly forecast take first hour and read pop (0-1)
  const precipitationProbability = // convert to %
      typeof pop0 === "number" ? Math.round(pop0 * 100) : null;

  return {
    location: "Current location",
    temperatureC: Math.round(current.temp),
    windSpeedMs: current.wind_speed,
    windSpeedKmh: Math.round(current.wind_speed * 3.6),
    humidity: current.humidity,
    condition: weather0?.main ?? "Unknown",
    conditionDescription: weather0?.description ?? "",
    precipitationProbability,
    rainMmLastHour: current.rain?.["1h"] ?? 0,
  };
}

module.exports = { getWeatherByCity, getWeatherByCoords };
