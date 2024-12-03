import axios from "axios";
import { API_BASE_URL, OPENWEATHER_API_KEY } from "../config";
import { LocationSearchResult } from "../types/Geo";

export const fetchCities = async (
  query: string,
): Promise<LocationSearchResult> => {
  if (query.length < 3) return [];

  try {
    const response = await axios.get(
      `${API_BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${OPENWEATHER_API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
