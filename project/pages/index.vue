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
const BASE_URL = 'http://universities.hipolabs.com/search';
const country = ref('Canada');
const search = ref('');

const handleRequest = (): Promise<APIBody> => {
  let startTime: number | null = null;

  // TODO: Find better place for this
  const _slugify = (term: string): string => {
    return term
      .toString()
      .toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a") // Special Characters #1
      .replace(/[èÈéÉêÊëË]+/g, "e") // Special Characters #2
      .replace(/[ìÌíÍîÎïÏ]+/g, "i") // Special Characters #3
      .replace(/[òÒóÓôÔõÕöÖº]+/g, "o") // Special Characters #4
      .replace(/[ùÙúÚûÛüÜ]+/g, "u") // Special Characters #5
      .replace(/[ýÝÿŸ]+/g, "y") // Special Characters #6
      .replace(/[ñÑ]+/g, "n") // Special Characters #7
      .replace(/[çÇ]+/g, "c") // Special Characters #8
      .replace(/[ß]+/g, "ss") // Special Characters #9
      .replace(/[Ææ]+/g, "ae") // Special Characters #10
      .replace(/[Øøœ]+/g, "oe") // Special Characters #11
      .replace(/[%]+/g, "pct") // Special Characters #12
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  return $fetch(BASE_URL, {
    params: {country: country.value, name: search.value},
    async onRequest() {
      startTime = new Date().getTime();
    },
    async onResponse({ response }) {
      response._data = {
        apiPerformance: {
          status: response.status,
          executionTime: startTime ? new Date().getTime() - startTime : null
        },
        // FIXME: How to define the response type?
        items: response._data.map((university: any) => {
          return {
            key: _slugify(`${university.name}-${university['state-province']}`),
            name: university.name,
            state: university['state-province'],
            website: university.web_pages
          }
        })
      }
    },
    async onResponseError({ response }) {
      response._data = {
        ...response._data,
        apiPerformance: {
          status: response.status,
          executionTime: startTime ? new Date().getTime() - startTime : null
        },
      }
    },
  })
}

const {data: countries} = await useFetch<Option[]>('/countries', {key:'countries'});
const {data: universities, refresh} = await useAsyncData<APIBody>('universities', handleRequest);

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