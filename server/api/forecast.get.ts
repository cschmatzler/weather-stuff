export default defineEventHandler((event) => {
  const lat = 0;
  const lon = 0;
  const part = 0;
  const apiKey = "123"
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;

  return "Hello";
})
