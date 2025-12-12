export type WeatherDTO = {
  location: string;
  temperatureC: number;
  windSpeedMs: number;
  windSpeedKmh: number;
  humidity: number;
  condition: string;
  conditionDescription: string;
  precipitationProbability: number | null; // 0-100
  rainMmLastHour: number; // mm
};

// Use computer IP, e.g. http://192.168.1.20:3000. use localhost for browser
const BACKEND_BASE_URL = "http://172.20.10.10:3000";

async function requestJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return res.json();
}

export function fetchWeatherByCity(city: string): Promise<WeatherDTO> {
  const url = `${BACKEND_BASE_URL}/weather?city=${encodeURIComponent(city)}`;
  return requestJson<WeatherDTO>(url);
}

export function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherDTO> {
  const url = `${BACKEND_BASE_URL}/weather/coords?lat=${lat}&lon=${lon}`;
  return requestJson<WeatherDTO>(url);
}