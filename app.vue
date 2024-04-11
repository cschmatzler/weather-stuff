<template>
  <div class="flex flex-col h-svh bg-gray-900 text-gray-50">
    <nav class="flex p-4 items-center gap-4">
      <div><i>📍</i> Seattle, Australia</div>
      <div>
        <label for="city-search" class="sr-only">Search City</label>
        <div class="bg-gray-700 py-2 px-4 rounded-full focus-within:ring-2">
          <i>🔎</i>
          <input
            v-model="cityName"
            id="city-search"
            class="bg-transparent border-0 placeholder:text-gray-400 focus:ring-0"
            type="search"
            placeholder="Search city ..."
          />
          <button @click="showCity">Submit</button>
        </div>
      </div>
      </nav>
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
      <section>2</section>
      <section class="col-span-3">3</section>
      <section>4</section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { CurrentWeatherData, DailyForecastData } from './utils/openWeatherMap';

const activeDay = ref(0);

const cityName = ref("");
const days = ref<DailyForecastData[]>([]);
const current = ref<CurrentWeatherData>();

const showCity = async () => {
  const { data: cities } = await useFetch("/api/city", {
    query: { q: cityName },
  });

  if(!cities.value) return;

  const { data } = await useFetch("/api/forecast", {
    query: {lat: cities.value[0].lat, lon: cities.value[0].lon}
  });

  if (!data.value?.daily || !data.value?.current) return;

  days.value = data.value?.daily;
  current.value = data.value?.current;
};


// const now = new Date().getTime()
// const isToday = current ? (current?.dt * 1000 - now) <= 1000 * 60 * 60 * 24 : false
</script>
