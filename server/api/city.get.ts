import type {
  LocationResponse
} from "@/utils/openWeatherMap";
import {
  LocationResponseSchema
} from "@/utils/openWeatherMap";
import { z } from "zod";

const querySchema = z.object({
  q: z.string(),
});

export default defineEventHandler(async (event) => {
  const { owmApiSecret } = useRuntimeConfig(event);
  const validatedQuery = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  );
  if (validatedQuery.success === false) {
    console.error(validatedQuery.error);
    return validatedQuery.error;
  }

  const { q } = validatedQuery.data;

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${owmApiSecret}`;

  try {
    const response = await $fetch(url);
    const validatedResponse: LocationResponse =
      LocationResponseSchema.parse(response);
    return validatedResponse;
  } catch (error) {
    console.error(error);
  }
});
