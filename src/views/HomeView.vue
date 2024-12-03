<script setup lang="ts">
import { Search, User } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useWeatherApi } from "../composables/useWeatherApi";
import { useLocationStore } from "../stores/location";
import { useRouter } from "vue-router";
import WeatherCard from "../components/WeatherCard.vue";

const router = useRouter();
const input = ref<HTMLInputElement | null>(null);

const { useCurrentWeather } = useWeatherApi();
const locationStore = useLocationStore();

const navigateAndFocus = async () => {
  await router.push("/search");

  requestAnimationFrame(() => {
    const targetInput = document.getElementById("focusInput");
    targetInput?.focus();
  });
};

const { data: currentLocationWeather } = useCurrentWeather();

const isDay = computed((): boolean => {
  if (!currentLocationWeather.value) return false;

  const currentTime = Number(currentLocationWeather.value.dt);
  const sunrise = Number(currentLocationWeather.value.sunrise);
  const sunset = Number(currentLocationWeather.value.sunset);

  return currentTime >= sunrise && currentTime < sunset;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-md mx-auto">
      <!-- Header -->
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-serif">Weather</h1>
        <RouterLink to="/profile">
          <button class="p-2">
            <User class="w-6 h-6" />
          </button>
        </RouterLink>
      </header>

      <!-- Search Bar -->
      <div class="relative mb-6">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
        <input
          @click="navigateAndFocus"
          ref="input"
          type="text"
          placeholder="Search for a city or airport"
          class="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Weather Cards -->
      <div class="space-y-4">
        <RouterLink
          :to="{
            name: 'Weather',
            query: {
              lat: currentLocationWeather?.lat,
              lon: currentLocationWeather?.lon,
            },
          }"
        >
          <div
            class="text-white rounded-2xl p-6 bg-cover bg-center"
            :class="[
              !isDay
                ? `bg-[url('/night-time.png')]`
                : `bg-[url('/day-time.png')]`,
            ]"
          >
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-semibold mb-1">My Location</h2>
                <p class="text-lg mb-3">
                  {{ currentLocationWeather?.cityName }}
                </p>
                <p class="text-lg">{{ currentLocationWeather?.description }}</p>
              </div>
              <div class="text-5xl font-light">
                {{ currentLocationWeather?.temperature.current }}°
              </div>
            </div>
            <div class="mt-4 text-sm">
              H:{{ currentLocationWeather?.temperature.max }}° L:{{
                currentLocationWeather?.temperature.min
              }}°
            </div>
          </div>
        </RouterLink>
        <div
          v-for="location in locationStore.favoriteLocations"
          :key="location.id"
        >
          <WeatherCard :lat="location.lat" :lon="location.lon" />
        </div>
      </div>
    </div>
  </div>
</template>
