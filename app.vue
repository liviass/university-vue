<template>
  <div>
    <div>
      <h4>Performance tracking of the API</h4>
      <p>
        <strong>Response code:</strong> {{ universities.apiPerformance.status }}
      </p>
      <p><strong>Amount of time the response took to retrieve:</strong> {{ universities.apiPerformance.executionTime }}</p>
    </div>

    <!-- TODO: O país "default" deve ser o Canadá -->
    <dropdown name="countries" :options="countries" @item-select="handleCountryChange" :selected="country"></dropdown>

    <search-box :searchTerm="search" @search-change="handleSearchChange"></search-box>
    <button @click="clearFilters">Clear Filters</button>
    <list :rows="universities.items"></list>
  </div>
</template>

<script setup>
const BASE_URL = 'http://universities.hipolabs.com/search';
const country = ref('Canada');
const search = ref('');

const handleRequest = () => {
  let startTime;

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
        items: response._data.map((university) => {
          return {
            name: university.name,
            state: university['state-province'],
            website: university.web_pages[0] // TODO: Pegar todas as web pages
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

const {data: countries} = await useFetch('/countries');
const {data: universities, refresh} = await useAsyncData('/universities', handleRequest);

const clearFilters = () => {
  country.value = 'Canada';
  search.value = '';
}

const handleCountryChange = async (countryName) => {
  country.value = countryName;
  refresh();
}

const handleSearchChange = (searchTerm) => {
  search.value = searchTerm;
  refresh();
}
</script>
