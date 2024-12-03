<script setup lang="ts">
import { ref } from "vue";
import { SearchIcon, XIcon } from "lucide-vue-next";
import { Location } from "../types/Geo";

import { getCountryData, TCountryCode } from "countries-list";
import { useRouter } from "vue-router";
import { useCitiesQuery } from "../composables/useGeoApi";

const query = ref<string>("");
const router = useRouter();

const { data, isLoading, refetch, error } = useCitiesQuery(query);

const clearSearch = () => {
  query.value = "";
};

const handleSubmit = (event: Event) => {
  event.preventDefault();
  if (query.value.length >= 3) {
    refetch();
  }
};

const selectCity = (city: Location) => {
  router.push({
    name: "Weather",
    query: {
      lat: city.lat,
      lon: city.lon,
    },
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md mx-auto p-4">
    <div class="relative">
      <!-- Search Input -->
      <div class="relative w-full">
        <div class="flex items-center bg-gray-100 rounded-lg">
          <SearchIcon class="h-5 w-5 text-gray-400 absolute left-3" />
          <input
            class="w-full bg-gray-100 rounded-lg pl-10 pr-10 py-3 text-gray-900 focus:outline-none"
            v-model="query"
            placeholder="Search cities..."
            type="text"
            id="focusInput"
          />
          <button
            v-if="query"
            @click="clearSearch"
            type="button"
            class="absolute right-10"
          >
            <XIcon class="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div v-if="isLoading" class="p-4 text-gray-500">Loading cities...</div>

        <div v-if="error" class="p-4 text-red-500">
          Error fetching cities. Please try again.
        </div>

        <div v-if="data" class="mt-2 bg-white rounded-lg shadow-sm">
          <div
            v-for="(city, index) in data"
            :key="index"
            class="cursor-pointer"
            @click="selectCity(city)"
          >
            <div class="px-4 py-3">
              <div class="flex items-baseline">
                <span class="font-medium">{{ city.name }}, </span>
                <span class="ml-1 text-gray-600">{{ city.state }}</span>
                <span class="ml-1 text-gray-600">{{
                  getCountryData(city.country as TCountryCode).name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
