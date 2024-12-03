import { defineStore } from "pinia";
import { FavoriteLocations } from "../types/Favorites";

export const useLocationStore = defineStore("location", {
  state: () => ({
    favoriteLocations: [] as FavoriteLocations[],
  }),
  actions: {
    hasMatchInFavorites(location: FavoriteLocations) {
      const hasMatch = this.favoriteLocations.some(
        (item) => item.lat === location.lat && item.lon === location.lon,
      );
      return hasMatch;
    },
    addToFavorites(location: FavoriteLocations) {
      if (!this.hasMatchInFavorites(location)) {
        this.favoriteLocations.push(location);
      }
    },

    removeFromFavorites(location: FavoriteLocations) {
      if (this.hasMatchInFavorites(location)) {
        const filteredItems = this.favoriteLocations.filter((item) => {
          return item.lat !== location.lat && item.lon !== location.lon;
        });
        this.favoriteLocations = filteredItems;
      }
    },
  },
});
