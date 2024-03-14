<template>
  <button class="rounded-xl overflow-hidden" :class="active ? 'bg-blue-300' : 'bg-gray-600 text-gray-50 p-3'">
    <template v-if="active">
      <header class="flex bg-blue-400 justify-between p-3">
        <p>{{ weekday }}</p>
        <p>{{ time }}</p>
      </header>
      <div class="p-3">
        <span class="text-4xl">{{ icon }}</span>
        <span class="text-4xl font-bold">{{ temperature }}°C</span>
      </div>
      <footer class="p-3 text-sm">
        More info..
      </footer>
    </template>
    <template v-else>
      <header>{{ weekday }}</header>
      <hr class="border-gray-500" />
      <span class="p-3">{{ icon }}</span>
      <footer class="text-3xl font-medium">{{ temperature }}°C</footer>
    </template>
  </button>
</template>

<script setup lang="ts">
const { data } = withDefaults(defineProps<{
  active: boolean,
  data: DailyForecastData | CurrentWeatherData
}>(), {
  active: false
})

const timestamp = data.dt * 1000;
const date = new Date(timestamp);
const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
const time = date.toLocaleTimeString();

const temperature = computed(() => data.temp.day.toFixed())
const icon = computed(() => {
  const iconMap: Record<string, string> = {
    "01d": "☀️",
    "02d": "🌤️",
    "04d": "☁️",
    "10d": "🌦️"
  }

  return iconMap[data.weather[0].icon] ?? data.weather[0].icon
})
</script>
