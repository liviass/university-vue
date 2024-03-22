<template>
  <div class="stack">
    <tab-bar/>
    <list :rows="favorites" :handleRemove="remove"></list>
  </div>
</template>

<script setup lang="ts">
import type { University } from '../types'

const { $getAll, $remove } = useNuxtApp();
const favorites = ref(await $getAll() as University[]);
const refreshFavorites = async () => favorites.value = await $getAll() as University[];
const remove = (key: string): Promise<University> => $remove(key, refreshFavorites);
</script>

<style scoped lang="scss">
.stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  max-width: 960px;
  margin: auto;
}
</style>