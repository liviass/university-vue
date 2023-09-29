<template>
  <input class="search" placeholder="Filter by university name" :value="searchTerm" @input="$emit('search-change', $event.target.value)"/>
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

<style scoped lang="scss">
.search {
  line-height: 2rem;
  border: none;
  font-family: var(--display-font);
  padding: 0 0.5rem;
  border-radius: 6px;
  width: calc(100% - 1rem); // 100% - padding
  border: 1px solid var(--primary-color);
}
</style>