import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

import ProfileView from "../views/ProfileView.vue";
import DashboarView from "../views/DashboardView.vue";
import WeatherDetailsView from "../views/WeatherDetailsView.vue";
import SearchView from "../views/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: DashboarView },
  {
    path: "/weather",
    name: "Weather",
    component: WeatherDetailsView,
    props: (route: RouteLocationNormalized) => ({
      latitude: route.query.lat ? parseFloat(route.query.lat as string) : null,
      longitude: route.query.lon ? parseFloat(route.query.lon as string) : null,
    }),
    meta: { transition: "slide-left" },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: { transition: "slide-left" },
  },
  {
    path: "/search",
    component: SearchView,
    meta: { transition: "slide-left" },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
