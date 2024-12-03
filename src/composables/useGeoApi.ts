import { Ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchCities } from "../services/geo";

export const useCitiesQuery = (query: Ref<string>) => {
  return useQuery({
    queryKey: ["cities", query.value],
    queryFn: () => fetchCities(query.value),
    enabled: !!query.value,
  });
};
