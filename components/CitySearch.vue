<template>
  <ComboboxRoot
    v-model="city"
    v-model:search-term="citySearchTerm"
    @update:search-term="onSearchUpdate"
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
        <div v-if="loading">Loading...</div>
        <template v-else>
          <ComboboxEmpty />
          <ComboboxItem
            v-for="(cityData, index) in cities"
            :key="index"
            :value="cityData"
            as="button"
            class="py-1 px-2 block w-full text-left rounded truncate data-[highlighted]:bg-gray-600"
            @select="
              () => {
                $emit('select', cityData);
                cities = [];
              }
            "
          >
            <ComboboxItemIndicator class="bg-red-500" />
            <span> {{ cityData.name }} {{ cityData.state }} </span>
          </ComboboxItem>
        </template>
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

defineEmits<{
  select: [LocationResponse[number]];
}>();

const loading = ref(false);
const city = ref("");
const citySearchTerm = ref("");
const cities = ref<LocationResponse>([]);

let updateTimeout: NodeJS.Timeout | undefined = undefined;

const onSearchUpdate = (searchValue: string) => {
  clearTimeout(updateTimeout);
  updateTimeout = undefined;
  loading.value = true;

  updateTimeout = setTimeout(async () => {
    if (searchValue.trim().length === 0) {
      loading.value = false;
      return;
    }

    const citiesResult = await $fetch("/api/city", {
      query: { q: searchValue },
    });
    loading.value = false;

    if (!citiesResult) return [];
    cities.value = citiesResult;
  }, 1000);
};
</script>
