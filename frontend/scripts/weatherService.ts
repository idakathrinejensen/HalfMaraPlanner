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

// If running on a real phone, localhost WON'T work.
// Use your computer's LAN IP, e.g. http://192.168.1.20:3000
const BACKEND_BASE_URL = "http://localhost:3000";

export async function fetchWeatherByCity(city: string): Promise<WeatherDTO> {
  const url = `${BACKEND_BASE_URL}/weather?city=${encodeURIComponent(city)}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather request failed (${res.status}): ${text}`);
  }

  return res.json();
}