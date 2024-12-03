import { TCountryCode } from "countries-list";

export interface WeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: CityDetails;
}

export interface WeatherEntry {
  dt: number;
  main: TemperatureDetails;
  weather: WeatherCondition[];
  clouds: CloudCoverage;
  wind: WindDetails;
  visibility: number;
  pop: number; // Probability of precipitation
  sys: ForecastDetails;
  dt_txt: string;
}

export interface TemperatureDetails {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CloudCoverage {
  all: number; // Cloudiness percentage
}

export interface WindDetails {
  speed: number;
  deg: number;
  gust: number;
}

export interface ForecastDetails {
  pod: string; // Part of the day (e.g., "d" for day, "n" for night)
}

export interface CityDetails {
  id: number;
  name: string;
  coord: Coordinates;
  country: TCountryCode;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
