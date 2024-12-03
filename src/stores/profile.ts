import { defineStore } from "pinia";
import { Profile } from "../types/Profile";

export const useLocationStore = defineStore("profile", {
  state: () => ({
    user: {} as Profile,
  }),
  actions: {},
});
