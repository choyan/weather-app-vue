<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useWeatherApi } from "../composables/useWeatherApi";
import { capitalizeFirstLetter } from "../utils/uppercase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocationQueryValue } from "vue-router";

dayjs.extend(utc);
dayjs.extend(timezone);

const props = defineProps<{
  lat: LocationQueryValue | LocationQueryValue[];
  lon: LocationQueryValue | LocationQueryValue[];
}>();

const { lat, lon } = toRefs(props);
const { useFetchWeather } = useWeatherApi();

const { data: location } = useFetchWeather(lat.value, lon.value);

const isDay = computed((): boolean => {
  if (!location.value) return false;

  const currentTime = Number(location.value.dt);
  const sunrise = Number(location.value.sunrise);
  const sunset = Number(location.value.sunset);

  return currentTime >= sunrise && currentTime < sunset;
});

const timestamp = computed(() => {
  if (
    !location.value ||
    location.value.dt === undefined ||
    location.value.timezone === undefined
  ) {
    return null;
  }
  const offset = location.value.timezone / 3600;

  return dayjs
    .unix(Number(location.value.dt))
    .utcOffset(offset)
    .format("YYYY-MM-DD HH:mm:ss");
});
</script>

<template>
  <RouterLink
    :to="{
      name: 'Weather',
      query: { lat, lon },
    }"
  >
    <div
      class="text-white rounded-2xl p-6 bg-cover bg-center"
      :class="[
        !isDay ? `bg-[url('/night-time.png')]` : `bg-[url('/day-time.png')]`,
      ]"
    >
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold mb-1">
            {{ location?.cityName }}
          </h2>
          <p class="text-gray-300 mb-3">
            {{ dayjs(timestamp).format("hh:mm A") }}
          </p>
          <p class="text-lg">
            {{ capitalizeFirstLetter(location?.description) }}
          </p>
        </div>
        <div class="text-5xl font-light">
          {{ location?.temperature.current }}°
        </div>
      </div>
      <div class="mt-4 text-sm">
        H:{{ location?.temperature.max }}° L:{{ location?.temperature.min }}°
      </div>
    </div>
  </RouterLink>
</template>
