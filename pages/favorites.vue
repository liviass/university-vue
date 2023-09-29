<template>
  <div class="stack">
    <tab-bar/>
    <list :rows="favorites" :handleRemove="remove"></list>
  </div>
</template>

<script setup>
const { $getAll, $remove } = useNuxtApp();
const favorites = ref(await $getAll());
const refreshFavorites = async () => favorites.value = await $getAll();
const remove = (key) => $remove(key, refreshFavorites);
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