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
        <th><p v-for="site in row.website">{{ site }}</p></th>
        <th>
          <button v-if="!isFavorite(row.key)" @click="() => handleAdd(row)">Add to Favorites</button>
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
    default: []
  },
  isFavorite: {
    type: Function,
    default: (key) => true
  },
  handleAdd: {
    type: Function,
    default: (row) => {}
  },
  handleRemove: {
    type: Function,
    default: (row) => {}
  }
})
</script>