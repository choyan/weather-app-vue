import { createApp } from "vue";
import type { ComponentPublicInstance } from "vue";
import { createPinia } from "pinia";
import { router } from "./router/";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { globalErrorStore } from "./stores/globalErrorStores";
import App from "./App.vue";
import "./assets/styles/style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueQueryPlugin);
app.use(router);

app.config.errorHandler = (
  err: unknown,
  _instance: ComponentPublicInstance | null,
  info: string,
) => {
  console.error(`Global Error: ${(err as Error).message}, in ${info}`);
  globalErrorStore.addError(err as Error);
};

app.mount("#app");
