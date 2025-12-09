// weather service

const WEATHER_KEY = env.OPENWEATHER_API_KEY;


export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather`;

  const response = await axios.get(url, {
    params: {
      q: city,
      appid: WEATHER_KEY,
      units: "metric",
    },
  });

  return response.data;
}