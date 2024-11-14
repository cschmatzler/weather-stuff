<template>
  <button
    class="rounded-xl overflow-hidden flex flex-col grow items-stretch justify-around"
    :class="active ? 'bg-blue-300 text-gray-900' : 'bg-gray-600 text-gray-50 p-3'"
  >
    <template v-if="active">
      <header class="flex bg-blue-400 justify-between p-3">
        <div class="text-start">
          <p>{{ weekday }}</p>
          <p>{{ localizedDate }}</p>
        </div>
        <p v-if="isCurrent" class="ml-4">{{ time }}</p>
      </header>
      <div class="p-3">
        <span class="text-6xl font-semibold">{{ temperature }}°</span>
        <span v-if="icon" class="ml-4 text-5xl">{{ icon }}</span>
      </div>
      <footer class="p-3 text-sm">
        <dl>
          <div class="flex gap-2">
            <dt class="text-gray-600">Wind:</dt>
            <dd>{{ windSpeed }} km/h</dd>
          </div>
        </dl>
      </footer>
    </template>
    <template v-else>
      <header>{{ weekday }}</header>
      <hr class="border-gray-500" >
      <span class="p-3 text-5xl">{{ icon }}</span>
      <footer class="text-3xl font-medium">{{ temperature }}°</footer>
    </template>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active: boolean;
    timestamp: number;
    iconId: string;
    temperature: number;
    isCurrent: boolean;
    windSpeed: number;
  }>(),
  {
    active: false,
  }
);

const timestamp = props.timestamp * 1000;
const date = new Date(timestamp);
const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
const time = date.toLocaleTimeString("en-US", { timeStyle: "short" });
const localizedDate = date.toLocaleDateString();

const temperature = computed(() => props.temperature.toFixed());
const icon = computed(() => {
  const iconMap: Record<string, string> = {
    "01d": "☀️",
    "02d": "🌤️",
    "04d": "☁️",
    "10d": "🌦️",
    "13d": "🌨️",
  };

  return iconMap[props.iconId];
});
</script>
