<script setup lang="ts">
import { RouterView } from "vue-router";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Toaster } from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import ErrorBoundary from "./components/ErrorBoundary.vue";
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition || 'fade'">
      <component :is="Component" />
    </transition>
    <ErrorBoundary />
  </router-view>
  <Toaster />
  <VueQueryDevtools />
</template>
