import dayjs from "dayjs";
import { LocationQueryValue } from "vue-router";
import axios from "axios";
import { HourlyForecast } from "../composables/useWeatherApi";
import { WeatherApiResponse, WeatherCondition } from "../types/Weather";
import { CurrentWeather } from "../types/CurrentWeather";
import { API_BASE_URL, OPENWEATHER_API_KEY, UNITS } from "../config";

const transformCurrentWeather = (data: WeatherApiResponse): CurrentWeather => ({
  temperature: {
    current: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    min: Math.round(data.main.temp_min),
    max: Math.round(data.main.temp_max),
  },
  lat: data.coord.lat,
  lon: data.coord.lon,
  dt: data.dt,
  timestamp: dayjs(data.dt * 1000).format("hh:mm A"),
  timezone: data.timezone,
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  windSpeed: data.wind.speed,
  windDirection: data.wind.deg,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  cityName: data.name,
  country: data.sys.country,
  description: data.weather[0].description,
  icon: `${import.meta.env.BASE_URL}/weather-icons/${data.weather[0].icon}.svg`,
});

export const fetchCurrentWeather = async (
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[],
): Promise<CurrentWeather> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: UNITS,
      },
    });
    return transformCurrentWeather(response.data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

// Fetch hourly forecast
export const fetchHourlyForecast = async (
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[],
): Promise<HourlyForecast[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        cnt: 4,
        units: "metric",
      },
    });

    const data = response.data.list.map((item: WeatherApiResponse) => ({
      time: dayjs(item.dt * 1000).format("hh:mm A"),
      temperature: Math.round(item.main.temp),
      icon: `${import.meta.env.BASE_URL}/weather-icons/${item.weather[0].icon}.svg`,
      description: item.weather[0].description,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching hourly forecast:", error);
    throw error;
  }
};

export const fetchAverageTemperature = async (
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[],
) => {
  try {
    const url = `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=${UNITS}`;
    const response = await axios.get(url);

    if (response) {
      const tempData = response.data.list
        .slice(0, 24 * 3)
        .map((entry: WeatherApiResponse) => entry.main.temp);

      const weatherData = response.data.list
        .slice(0, 24 * 3)
        .map((entry: WeatherApiResponse) => entry.weather[0]);

      const day1Temps = tempData.slice(0, 8);
      const day2Temps = tempData.slice(8, 16);
      const day3Temps = tempData.slice(16, 24);
      const day4Temps = tempData.slice(24, 32);

      const day1Weather = weatherData.slice(0, 8);
      const day2Weather = weatherData.slice(8, 16);
      const day3Weather = weatherData.slice(16, 24);
      const day4Weather = weatherData.slice(24, 32);

      function getMostFrequentWeather(
        weatherArray: WeatherCondition[],
      ): string {
        const frequency: { [key: string]: number } = {};

        weatherArray.forEach((weather) => {
          frequency[weather.main] = (frequency[weather.main] || 0) + 1;
        });

        let maxCount = 0;
        let mostFrequentWeather = "";
        for (const weather in frequency) {
          if (frequency[weather] > maxCount) {
            maxCount = frequency[weather];
            mostFrequentWeather = weather;
          }
        }
        return mostFrequentWeather;
      }

      function calculateAverage(temps: number[]): number {
        let sum = 0;
        for (let i = 0; i < temps.length; i++) {
          sum += temps[i];
        }
        return sum / temps.length;
      }

      function getWeatherIcon(weatherType: string): string {
        const iconMap: Record<string, string> = {
          Clear: "01d",
          Clouds: "02d",
          Rain: "10d",
          Drizzle: "09d",
          Snow: "13d",
          Thunderstorm: "11d",
          Mist: "50d",
          Fog: "50d",
          Haze: "50d",
          Dust: "50d",
          Sand: "50d",
          Ash: "50d",
          Squall: "50d",
          Tornado: "50d",
        };
        return iconMap[weatherType] || "01d";
      }

      const result = [
        {
          day: 1,
          avgTemperature: calculateAverage(day1Temps),
          avgWeatherType: getMostFrequentWeather(day1Weather),
          weatherIcon: `${import.meta.env.BASE_URL}/weather-icons/${getWeatherIcon(getMostFrequentWeather(day1Weather))}.svg`,
        },
        {
          day: 2,
          avgTemperature: calculateAverage(day2Temps),
          avgWeatherType: getMostFrequentWeather(day2Weather),
          weatherIcon: `${import.meta.env.BASE_URL}/weather-icons/${getWeatherIcon(getMostFrequentWeather(day2Weather))}.svg`,
        },
        {
          day: 3,
          avgTemperature: calculateAverage(day3Temps),
          avgWeatherType: getMostFrequentWeather(day3Weather),
          weatherIcon: `${import.meta.env.BASE_URL}/weather-icons/${getWeatherIcon(getMostFrequentWeather(day3Weather))}.svg`,
        },
        {
          day: 4,
          avgTemperature: calculateAverage(day4Temps),
          avgWeatherType: getMostFrequentWeather(day4Weather),
          weatherIcon: `${import.meta.env.BASE_URL}/weather-icons/${getWeatherIcon(getMostFrequentWeather(day4Weather))}.svg`,
        },
      ];

      return result;
    }
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};
