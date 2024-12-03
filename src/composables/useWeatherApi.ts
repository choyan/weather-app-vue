import { useQuery } from "@tanstack/vue-query";
import { LocationQueryValue } from "vue-router";
import { useGeolocation } from "@vueuse/core";
import { computed } from "vue";
import {
  fetchAverageTemperature,
  fetchCurrentWeather,
  fetchHourlyForecast,
} from "../services/weather";

export interface HourlyForecast {
  time: number;
  temperature: number;
  icon: string;
  description: string;
  precipitation: number;
}

export interface DailyForecast {
  date: number;
  temperature: {
    min: number;
    max: number;
  };
  icon: string;
  description: string;
  precipitation: {
    probability: number;
    amount: number;
  };
}

export interface WeatherApiOptions {
  units?: "metric" | "imperial";
  lang?: string;
}

export function useWeatherApi() {
  const useCurrentWeather = () => {
    const { coords } = useGeolocation();

    const isValidCoordinates = computed(
      () =>
        coords.value?.latitude != null &&
        coords.value?.longitude != null &&
        !isNaN(coords.value.latitude) &&
        !isNaN(coords.value.longitude) &&
        coords.value.latitude >= -90 &&
        coords.value.latitude <= 90 &&
        coords.value.longitude >= -180 &&
        coords.value.longitude <= 180,
    );

    return useQuery({
      queryKey: [
        "currentWeather",
        coords.value?.latitude,
        coords.value?.longitude,
      ],
      queryFn: () =>
        fetchCurrentWeather(
          coords.value.latitude.toString(),
          coords.value.longitude.toString(),
        ),
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: isValidCoordinates,
    });
  };

  const useFetchAverageTemperature = (
    lat: LocationQueryValue | LocationQueryValue[],
    lon: LocationQueryValue | LocationQueryValue[],
  ) => {
    return useQuery({
      queryKey: ["weather", "forecast", { lat, lon }],
      queryFn: () => fetchAverageTemperature(lat, lon),
      enabled: !!lat && !!lon,
    });
  };

  const useFetchWeather = (
    lat: LocationQueryValue | LocationQueryValue[],
    lon: LocationQueryValue | LocationQueryValue[],
  ) => {
    return useQuery({
      queryKey: ["weather", { lat, lon }],
      queryFn: () => fetchCurrentWeather(lat, lon),
      enabled: !!lat && !!lon,
    });
  };

  const useHourlyForecast = (
    lat: LocationQueryValue | LocationQueryValue[],
    lon: LocationQueryValue | LocationQueryValue[],
  ) => {
    return useQuery({
      queryKey: ["hourlyForecast", lat, lon],
      queryFn: () => fetchHourlyForecast(lat, lon),
      retry: 1,
    });
  };

  return {
    useFetchWeather,
    useFetchAverageTemperature,
    useCurrentWeather,
    useHourlyForecast,
  };
}
