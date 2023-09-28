<template>
  <div>
    <dropdown :name="countries" :options="countries"></dropdown>
    <search-box></search-box>
    <list :rows="data"></list>
    {{ data }}
  </div>
</template>

<script setup>
const BASE_URL = 'http://universities.hipolabs.com/search?country=Canada'

const countries = [
  'Canada',
  'United States',
  'Mexico',
]

const { data, pending, error, status, refresh } = await useFetch(BASE_URL, {
  key: 'institutions',
  transform: (result) => {
    return result.map((institution) => {
      return {
        name: institution.name,
        state: institution['state-province'],
        website: institution.web_pages[0] // TODO: Pegar todas as web pages
      }
    })
  },
})
</script>