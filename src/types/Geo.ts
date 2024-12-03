import { TCountryCode } from "countries-list";

export type LocationSearchResult = Location[];

export interface Location {
  name: string;
  local_names?: LocalizedNames;
  lat: number;
  lon: number;
  country: TCountryCode;
  state: string;
}

export interface LocalizedNames {
  [languageCode: string]: string;
}
