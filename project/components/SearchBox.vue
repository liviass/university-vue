<template>
  <input class="search" placeholder="Filter by university name" :value="searchTerm" @input="$emit('search-change', ($event.target as HTMLInputElement).value)"/>
</template>

<script setup lang="ts">
interface Props {
  searchTerm: string;
}
const props = defineProps<Props>()

defineEmits<{
  'search-change': [value: string]
}>()
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