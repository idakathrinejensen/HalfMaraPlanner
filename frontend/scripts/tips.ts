import type { WeatherDTO } from "./weatherService";

export type TipGroup = "Clothing" | "Hydration" | "Energy";
export type Tips = Record<TipGroup, string>;

export function generateTips(w: WeatherDTO): Tips {
  const temp = w.temperatureC;
  const wind = w.windSpeedKmh;
  const humidity = w.humidity;
  const rainMm = w.rainMmLastHour;
  const pop = w.precipitationProbability ?? 0;

  // Clothing
  let clothing = "Wear comfortable running gear.";
  if (temp < 5) clothing = "Wear thermal layers and consider gloves/hat. Warm up extra.";
  else if (temp < 10) clothing = "Wear layers (long-sleeve + light jacket). You can adjust as you warm up.";
  else if (temp < 20) clothing = "A light long-sleeve or thin jacket works well.";
  else clothing = "Go for light, breathable clothing. Consider a cap if sunny.";

  if (rainMm > 0 || pop > 40) clothing += " Rain is likely—bring a light rain jacket or cap.";
  if (wind > 25) clothing += " It’s windy—add a windproof layer and avoid very exposed routes.";

  // Hydration
  let hydration = "Drink some water before your run and have water ready after.";
  if (temp >= 20 || humidity >= 70) hydration = "Hydrate a bit more than usual. Consider electrolytes if you sweat a lot.";
  if (temp >= 25) hydration += " Slow the pace slightly and seek shade if possible.";

  // Energy
  let energy = "No need for special fueling. A light pre-run snack if you feel hungry.";
  if (temp >= 25) energy = "Heat increases effort—have a small carb snack if your run is longer than ~45 minutes.";
  if (temp < 5) energy = "Start easy in the cold. Consider a small carb snack if it’s a longer run.";

  return { Clothing: clothing, Hydration: hydration, Energy: energy };
}