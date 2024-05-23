<template>
  <ComboboxRoot
    v-model="city"
    v-model:search-term="citySearchTerm"
    class="relative"
  >
    <ComboboxAnchor class="rounded-full bg-gray-700 focus-within:ring">
      <span class="px-2">🔎</span>
      <ComboboxInput
        class="border-0 p-4 bg-transparent placeholder-gray-400 focus:ring-0"
        placeholder="Search city ..."
      />
      <ComboboxTrigger />
      <ComboboxCancel />
    </ComboboxAnchor>

    <ComboboxContent class="absolute bg-gray-700 p-2 w-full rounded-md mt-2">
      <ComboboxViewport>
        <ComboboxEmpty />
        <ComboboxItem
          v-for="(cityData, index) in cities"
          :key="index"
          :value="cityData"
          as="button"
          class="py-1 px-2 block w-full text-left rounded truncate data-[highlighted]:bg-gray-600"
          @select="$emit('select', cityData)"
        >
          <ComboboxItemIndicator class="bg-red-500" />
          <span> {{ cityData.name }} {{ cityData.state }} </span>
        </ComboboxItem>
      </ComboboxViewport>
      <ComboboxArrow />
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import type { LocationResponse } from "../utils/openWeatherMap";

import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxCancel,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";
import { watchDebounced } from "@vueuse/core";

defineEmits<{
  select: [LocationResponse[number]];
}>();

const city = ref("");
const citySearchTerm = ref("");
const cities = ref<LocationResponse>([]);

watchDebounced(
  citySearchTerm,
  async () => {
    if (citySearchTerm.value.length < 3) return;

    const citiesResult = await $fetch("/api/city", {
      query: { q: citySearchTerm.value },
    });

    if (!citiesResult) return [];
    cities.value = citiesResult;
  },
  { debounce: 1000 }
);
</script>
