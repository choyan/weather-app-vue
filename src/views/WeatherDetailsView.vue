<script setup lang="ts">
import { Plus, ChevronsLeft, RotateCw, Trash2 } from "lucide-vue-next";
import { LocationQueryValue, useRoute } from "vue-router";
import { getCountryData, TCountryCode } from "countries-list";
import dayjs from "dayjs";
import { useWeatherApi } from "../composables/useWeatherApi";
import { capitalizeFirstLetter } from "../utils/uppercase";
import { useLocationStore } from "../stores/location";
import { CurrentWeather } from "../types/CurrentWeather";
import { toast } from "@steveyuowo/vue-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { FavoriteLocations } from "../types/Favorites";
import NextDaysForecast from "../components/NextDaysForecast.vue";

const route = useRoute();
const lat = route.query.lat;
const lon = route.query.lon;
const locationStore = useLocationStore();

const { useHourlyForecast, useFetchWeather, useFetchAverageTemperature } =
  useWeatherApi();

const { data: hourlyForecast } = useHourlyForecast(lat, lon);

const { data, isLoading, error, refetch } = useFetchWeather(lat, lon);

const { data: nextForecast, isLoading: nextForecastLoading } =
  useFetchAverageTemperature(lat, lon);

const handleRefetch = async () => {
  await refetch();
};

const handleHasMatchinFavorites = (data: CurrentWeather) => {
  const location: FavoriteLocations = {
    lat: data?.lat as unknown as LocationQueryValue | LocationQueryValue[],
    lon: data?.lon as unknown as LocationQueryValue | LocationQueryValue[],
  };
  const hasMatch = locationStore.hasMatchInFavorites(location);
  return hasMatch;
};

const handleAddToFavorites = (data: CurrentWeather) => {
  const location: FavoriteLocations = {
    lat: data?.lat as unknown as LocationQueryValue | LocationQueryValue[],
    lon: data?.lon as unknown as LocationQueryValue | LocationQueryValue[],
    id: uuidv4(),
  };
  locationStore.addToFavorites(location);
  toast.success("Added to Favorites!");
};

const handleRemoveFromFavorites = (data: CurrentWeather) => {
  const location: FavoriteLocations = {
    lat: data?.lat as unknown as LocationQueryValue | LocationQueryValue[],
    lon: data?.lon as unknown as LocationQueryValue | LocationQueryValue[],
  };
  locationStore.removeFromFavorites(location);
  toast.success("Removed from Favorites!");
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <div v-if="isLoading" class="text-center py-8">
      <p>Loading weather data...</p>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p>Failed to load weather data. Please try again later.</p>
    </div>
    <div v-else>
      <div
        class="bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6 pb-12"
      >
        <!-- Navigation -->
        <div class="flex justify-between items-center mb-4">
          <RouterLink to="/">
            <button class="p-2">
              <ChevronsLeft class="w-6 h-6" />
            </button>
          </RouterLink>
          <h1 class="text-xl font-medium">
            {{ data?.cityName }},
            {{ getCountryData(data?.country as TCountryCode).name }}
          </h1>
          <button class="p-2">
            <Plus
              v-if="!handleHasMatchinFavorites(data as CurrentWeather)"
              @click="handleAddToFavorites(data as CurrentWeather)"
              class="w-6 h-6"
            />
            <Trash2
              v-if="handleHasMatchinFavorites(data as CurrentWeather)"
              @click="handleRemoveFromFavorites(data as CurrentWeather)"
              :size="20"
            />
          </button>
        </div>

        <!-- Date -->
        <div class="text-center mb-8">
          <p class="text-lg">{{ dayjs().format("dddd, D MMMM YYYY") }}</p>
        </div>

        <!-- Current Weather -->
        <div class="text-center">
          <div class="mb-4">
            <img :src="data?.icon" class="w-24 h-24 mx-auto" />
          </div>
          <div class="text-6xl font-light mb-2">
            {{ data?.temperature.current }}° C
          </div>
          <div class="text-2xl mb-4">
            {{ capitalizeFirstLetter(data?.description) }}
          </div>
          <div class="text-sm opacity-90 flex justify-center items-center">
            <span>Last Update {{ data?.timestamp }}</span>
            <span className="ml-2 cursor-pointer" @click="handleRefetch"
              ><RotateCw :size="16"
            /></span>
          </div>
        </div>
      </div>

      <!-- Hourly Forecast -->
      <div class="px-6 py-8">
        <h2 class="text-2xl font-bold mb-4">Hourly Forecast</h2>
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="hour in hourlyForecast"
            :key="hour.time"
            class="bg-gray-100 rounded-lg p-4 text-center"
          >
            <img :src="hour?.icon" class="w-16 h-16 mx-auto mb-2" />
            <div class="text-xl font-medium mb-1">{{ hour.temperature }}°</div>
            <div class="text-sm text-gray-600">{{ hour.time }}</div>
          </div>
        </div>
      </div>

      <!-- Next 4 days Forecast -->
      <NextDaysForecast
        :isLoading="nextForecastLoading"
        :nextForecast="nextForecast"
      />
    </div>
  </div>
</template>
