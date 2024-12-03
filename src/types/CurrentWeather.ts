import { TCountryCode } from "countries-list";

export interface CurrentWeather {
  temperature: {
    current: number;
    feelsLike: number;
    min: number;
    max: number;
  };
  lat: number;
  lon: number;
  dt: number;
  timestamp: string;
  timezone: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  sunrise: number;
  sunset: number;
  cityName: string;
  country: TCountryCode;
  description?: string;
  icon: string;
}
