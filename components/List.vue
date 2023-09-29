<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>State/Province</th>
        <th>Website</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.key">
        <th>{{ row.name }}</th>
        <th>{{ row.state }}</th>
        <th>{{ row.website }}</th>
        <th>
          <button v-if="!favorites.includes(row.key)" @click="() => handleAdd(row)">Add to Favorites</button>
          <button v-else @click="() => handleRemove(row.key)">Remove from Favorites</button>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  favorites: {
    type: Array,
    required: true
  },
  handleAdd: {
    type: Function,
    required: true
  },
  handleRemove: {
    type: Function,
    required: true
  }
})
// // const favorites = ref([]);
// // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// const handleAdd = () => {
//   // const list = JSON.parse(localStorage.getItem('favorites')) || [];
//   // favorites.push(row.key);
//   // localStorage.setItem('favorites', JSON.stringify(list));
// }

// const remove = () => {
//   // const list = JSON.parse(localStorage.getItem('favorites')) || [];
//   // const index = list.indexOf(row.key);
//   // list.splice(index, 1);
//   // localStorage.setItem('favorites', JSON.stringify(list));
// }
</script>