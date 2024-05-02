<template>
  <ComboboxRoot
    v-model="city"
    v-model:search-term="citySearchTerm"
    class="relative"
  >
    <ComboboxAnchor>
      <ComboboxInput class="text-black" />
      <ComboboxTrigger />
      <ComboboxCancel />
    </ComboboxAnchor>

    <ComboboxContent class="absolute">
      <ComboboxViewport>
        <ComboboxEmpty />
        <ComboboxItem
          v-for="(city, index) in cities"
          :key="index"
          :value="city"
        >
          <ComboboxItemIndicator />
          <span> {{ city.name }} {{ city.state }} </span>
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

const city = ref("");
const citySearchTerm = ref("");
const cities = ref<LocationResponse>([]);

watchDebounced(
  citySearchTerm,
  async () => {
    console.log(citySearchTerm.value);
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
