import { LocationQueryValue } from "vue-router";

export interface FavoriteLocations {
  lat: LocationQueryValue | LocationQueryValue[];
  lon: LocationQueryValue | LocationQueryValue[];
  id?: PropertyKey;
}
