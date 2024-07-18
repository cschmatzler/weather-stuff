import { z } from "zod";

const querySchema = z.object({
  lat: z.string(),
  lon: z.string(),
});

export default defineEventHandler(async (event) => {
  const { owmApiSecret } = useRuntimeConfig(event);
  const validatedQuery = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body)
  );
  if (validatedQuery.success === false) {
    console.error(validatedQuery.error);
    return validatedQuery.error;
  }
  const { lat, lon } = validatedQuery.data;

  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${owmApiSecret}`;

  try {
    const response = await $fetch(url);
    return response;
  } catch (error) {
    console.error(error);
  }
});
