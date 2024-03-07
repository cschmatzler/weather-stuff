<template>
  <div class="flex flex-col h-svh">
    <nav class="flex h-12 bg-black">
    </nav>
    <main class="flex-grow lg:grid lg:grid-cols-4 bg-blue-500">
      <section class="bg-red-500 flex gap-4 items-start">
        <DayCard
          v-for="day in 7"
          :key="day"
          :active="activeDay === day"
          @click="activeDay = day"
        />
      </section>
      <section>2</section>
      <section class="col-span-3">3</section>
      <section>4</section>
    </main>
  </div>
</template>

<script setup lang="ts">
const activeDay = ref(1)

const { data } = await useFetch("/api/forecast")
console.log(data.value);


</script>
