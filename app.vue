<template>
  <div class="flex flex-col h-svh">
    <nav class="flex h-12 bg-black">
    </nav>
    <main class="flex-grow lg:grid lg:grid-cols-4 bg-blue-500">
      <section class="bg-red-500 flex gap-4 items-start">
        <template
        v-for="(day, i) in days"
          :key="day.dt"
        >
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
const activeDay = ref(0)

const { data } = await useFetch("/api/forecast", {
  query: {lat: '53.551086', lon: '9.993682'}
})

const days = data.value?.daily;
const current = data.value?.current;

// const now = new Date().getTime()
// const isToday = current ? (current?.dt * 1000 - now) <= 1000 * 60 * 60 * 24 : false
</script>
