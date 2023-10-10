<template>
  <div class="stack">
    <tab-bar />
    <performance-card v-if="universities && universities" class="align-left" :status="universities.apiPerformance.status" :executionTime="universities.apiPerformance.executionTime || undefined" />

    <div class="filters__wrapper align-left">
      <dropdown v-if="countries" name="countries" :options="countries" @item-select="handleCountryChange" :selected="country" />
      <span v-else>Error loading countries</span>
      <search-box :searchTerm="search" @search-change="handleSearchChange" />
      <button class="filter__button" @click="clearFilters">Clear</button>
    </div>

    <list v-if="universities" :rows="universities.items" :isFavorite="isFavorite" :handleAdd="addToFavorites" :handleRemove="removeFromFavorites" />
    <span v-else>No response was received for your request.</span>
  </div>
</template>

<script setup lang="ts">
const country = ref('Canada');
const search = ref('');

// [NOTE] On the documentation for "useFetch" (https://nuxt.com/docs/api/composables/use-fetch#usefetch) it says:
// "It automatically generates a key based on URL and fetch options, provides type hints
// for request url based on server routes, and infers API response type"
//
// But I had there's a bug, "When we use useFetch with the same URL, but with different
// query string parameters, changing the parameters does not trigger a new fetch"
//
// Github issue: https://github.com/nuxt/nuxt/issues/14342
// For some reason, I couldn't use the "useFetch" hook, so I had to use the "$fetch" method
// with useAsyncData instead.
//
const {data: countries} = await useFetch<Option[]>('/countries', {key:'countries'});
const {data: universities, refresh} = await useAsyncData<APIBody>('universities', () => $fetch('/universities', {params: {country: country.value || undefined, name: search.value || undefined}}));

const clearFilters = () => {
  country.value = 'Canada';
  search.value = '';
  refresh();
}

const handleCountryChange = async (countryName: string): Promise<void> => {
  country.value = countryName;
  refresh();
}

const handleSearchChange = (searchTerm: string): void => {
  search.value = searchTerm;
  refresh();
}

// Favorites
const { $getAll, $remove, $add } = useNuxtApp();
const favorites = ref((await $getAll() as University[]).map(({key}) => key));
const refreshFavorites = async () => {
  favorites.value = (await $getAll() as University[]).map(({key}) => key);
}
const removeFromFavorites = (key: string) => $remove(key, refreshFavorites);
const addToFavorites = (university: University) => $add(university, refreshFavorites);
const isFavorite = (key: string) => favorites.value.includes(key)
</script>

<style scoped lang="scss">
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 960px;
  margin: auto;
}

.align-left {
  align-self: flex-start;

  @media (max-width: 62em) {
    align-self: center;
  }
}

.filters__wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem); // 100% - padding

  @media (max-width: 62em) {
    flex-direction: column;
    padding: 1rem 0;
  }
}

.filter__button {
  border: none;
  background-color: var(--primary-color);
  color: var(--text-secondary-color);
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--text-primary-color);
  }
}
</style>