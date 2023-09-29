<template>
  <div>
    <div>
      <h4>Performance tracking of the API</h4>
      <p>
        <strong>Response code:</strong> {{ universities.apiPerformance.status }}
      </p>
      <p><strong>Amount of time the response took to retrieve:</strong> {{ universities.apiPerformance.executionTime }}</p>
    </div>

    <dropdown name="countries" :options="countries" @item-select="handleCountryChange" :selected="country"></dropdown>

    <search-box :searchTerm="search" @search-change="handleSearchChange"></search-box>
    <button @click="clearFilters">Clear Filters</button>
    <list :rows="universities.items" :favorites="favorites" :handleAdd="addToFavorites" :handleRemove="removeFromFavorites"></list>
  </div>
</template>

<script setup>
const BASE_URL = 'http://universities.hipolabs.com/search';
const country = ref('Canada');
const search = ref('');

const handleRequest = () => {
  let startTime;
  // TODO: Find better place for this
  const _slugify = (term) => {
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
        items: response._data.map((university) => {
          return {
            key: _slugify(`${university.name}-${university['state-province']}`),
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

const favorites = ref([]);

// Favorites DB
let db; // objeto para manipular o BD

if (process.client) {
  let reqBD = indexedDB.open('universitiesdb', 1)

  reqBD.onerror = function(evento) {
    console.log(reqBD.error);
  }
  reqBD.onsuccess = function(evento) {
    db = reqBD.result;
      // Read all
    db.transaction(['favorites'])
      .objectStore('favorites')
      .getAll().onsuccess = function(evento) {
        console.log('RESULT', evento.target.result);
        // favorites.value = evento.target.result;
        favorites.value = evento.target.result.map(({key}) => key);
    }
  }

  reqBD.onupgradeneeded = function(evento) {
    db = reqBD.result;
    if (!bd.objectStoreNames.contains('favorites'))
      bd.createObjectStore('favorites', {keyPath: 'key'});
  }


}

// Delete
const removeFromFavorites = (key) => {
  db.transaction(['favorites'], 'readwrite')
    .objectStore('favorites')
    .delete(key)
    .onsuccess = function(evento) {
      refreshFavorites();
      // favorites.value = favorites.value.filter((favorite) => favorite.key !== key);
      console.log('Livro excluído');
    }
  };

// Add
const addToFavorites = (university) => {
  let reqOS = db.transaction(['favorites'], 'readwrite').objectStore('favorites').add({...university});

  reqOS.onerror = function(evento) {
    console.log(reqOS.error);
  }
  reqOS.onsuccess = function(evento) {
    console.log(reqOS.result);
    refreshFavorites();
  }
}

const refreshFavorites = () => {
  db.transaction(['favorites'])
    .objectStore('favorites')
    .getAll().onsuccess = function(evento) {
      console.log('RESULT', evento.target.result);
      favorites.value = evento.target.result.map(({key}) => key);
    }
}
</script>
