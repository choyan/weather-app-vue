<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  isLoading: boolean;
  nextForecast:
    | {
        day: number;
        avgTemperature: number;
        avgWeatherType: string;
        weatherIcon: string;
      }[]
    | undefined;
}>();

const { isLoading, nextForecast } = toRefs(props);
</script>

<template>
  <div class="px-6 pb-8">
    <h2 class="text-2xl font-bold mb-4">Weekly Forecast</h2>
    <div v-if="isLoading">
      <span>loading ...</span>
    </div>
    <div v-else class="space-y-3">
      <div
        v-for="day in nextForecast"
        :key="day.day"
        class="bg-blue-50 rounded-xl p-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <img :src="day.weatherIcon" class="w-10 h-10 text-blue-600" />
          <div>
            <div class="font-medium">Tuesday</div>
            <div class="text-gray-600">{{ day.avgWeatherType }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg font-medium"
            >{{ day.avgTemperature.toFixed(0) }}° C</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
