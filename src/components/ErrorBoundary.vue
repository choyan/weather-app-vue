<script lang="ts">
import { computed } from "vue";
import { globalErrorStore } from "../stores/globalErrorStores";

export default {
  setup() {
    const error = computed(() => globalErrorStore.error);
    const clearError = () => globalErrorStore.clearError();
    return { error, clearError };
  },
};
</script>

<template>
  <div v-if="error" class="error-overlay">
    <p>An unexpected error occurred: {{ error.message }}</p>
    <button @click="clearError">Dismiss</button>
  </div>
</template>

<style scoped>
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 0, 0, 0.1);
  color: red;
  padding: 1rem;
  z-index: 1000;
}
</style>
