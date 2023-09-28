<template>
  <input placeholder="Filter by institution name" :value="searchTerm" @input="$emit('search-change', $event.target.value)"/>
</template>

<script setup>
const props = defineProps({
  searchTerm: {
    type: String,
    required: true
  }
})

defineEmits(['search-change'])
</script>

<style>
</style>