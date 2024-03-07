export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log(query);
  const lat = query.lat;
  const lon = query.lon;
  const apiKey = ""
  const part = "minutely,hourly,alerts"
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=metric`;

  const response = $fetch(url);
  return response;
})
