<template>
  <button class="rounded-xl overflow-hidden" :class="active ? 'bg-blue-300' : 'bg-gray-600 text-gray-50 p-3'">
    <template v-if="active">
      <header class="flex bg-blue-400 justify-between p-3">
        <p>{{ weekday }}</p>
        <p>Time</p>
      </header>
      <div class="p-3">
        <span class="text-4xl font-bold">16°</span>
        <span class="text-4xl">☀️</span>
      </div>
      <footer class="p-3 text-sm">
        More info..
      </footer>
    </template>
    <template v-else>
      <header>{{ weekday }}</header>
      <hr class="border-gray-500" />
      <span class="p-3">🌧️</span>
      <footer class="text-3xl font-medium">10°</footer>
    </template>
  </button>
</template>

<script setup lang="ts">

const { data } = withDefaults(defineProps<{
  active: boolean,
  data: any
}>(), {
  active: false
})

const timestamp = data.dt * 1000;
const date = new Date(timestamp);
const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

</script>
