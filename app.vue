<template>
  <div class="flex flex-col h-svh bg-gray-900 text-gray-50">
    <nav class="flex p-4 items-center gap-4">
      <div><i>📍</i> Seattle, Australia</div>
      <div>
        <label for="city-search" class="sr-only">Search City</label>
        <div class="bg-gray-700 py-2 px-4 rounded-full focus-within:ring-2">
          <i>🔎</i>
          <input
            id="city-search"
            v-model="cityName"
            class="bg-transparent border-0 placeholder:text-gray-400 focus:ring-0"
            type="search"
            placeholder="Search city ..."
          />
          <button @click="showCity">Submit</button>
        </div>
      </div>
    </nav>
    <ul>
      <li v-for="city in cities" :key="`${city.lat}-${city.lon}`">
        {{ city.name }}
      </li>
    </ul>
    <main class="flex-grow lg:grid lg:grid-cols-4">
      <section class="flex gap-4 items-start">
        <template v-for="(day, i) in days" :key="day.dt">
          <DayCard
            v-if="i === 0 && current"
            :timestamp="current.dt"
            :icon-id="current.weather[0].icon"
            :temperature="current.temp"
            :active="activeDay === i"
            :is-current="true"
            @click="activeDay = i"
          />
          <DayCard
            v-else
            :timestamp="day.dt"
            :icon-id="day.weather[0].icon"
            :temperature="day.temp.day"
            :active="activeDay === i"
            :is-current="false"
            @click="activeDay = i"
          />
        </template>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type {
  CurrentWeatherData,
  DailyForecastData,
  LocationResponse,
} from "./utils/openWeatherMap";

const activeDay = ref(0);

const cityName = ref("");
const cities = ref<LocationResponse>([]);
const days = ref<DailyForecastData[]>([]);
const current = ref<CurrentWeatherData>();

const showCity = async () => {
  const citiesResult = await $fetch("/api/city", {
    query: { q: cityName.value },
  });

  if (!citiesResult) return;
  cities.value = citiesResult;

  // const data = await $fetch("/api/forecast", {
  //   query: { lat: cities[0].lat, lon: cities[0].lon },
  // });
  //
  // if (!data.daily || !data.current) return;
  //
  // days.value = data.daily;
  // current.value = data.current;
};

// const now = new Date().getTime()
// const isToday = current ? (current?.dt * 1000 - now) <= 1000 * 60 * 60 * 24 : false
</script>
