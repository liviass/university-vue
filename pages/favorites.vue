<template>
  <nuxt-link to="/">Voltar</nuxt-link>
  <list :rows="favorites" :handleRemove="remove"></list>
</template>

<script setup>
const { $getAll, $remove } = useNuxtApp();
const favorites = ref(await $getAll());
const refreshFavorites = async () => favorites.value = await $getAll();
const remove = (key) => $remove(key, refreshFavorites);

</script>