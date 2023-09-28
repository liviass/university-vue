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
      <tr v-for="row, i in rows" :key="i">
        <th>{{ row.name }}</th>
        <th>{{ row.state }}</th>
        <th>{{ row.website }}</th>
        <th><button>View</button></th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  }
})

</script>