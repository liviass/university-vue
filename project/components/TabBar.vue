<template>
  <div class="tab-bar">
    <nuxt-link
      class="tab-bar__item"
      :class="{ selected: current === '/' }"
      to="/"
      >Universities</nuxt-link
    >
    <nuxt-link
      class="tab-bar__item"
      :class="{ selected: current === '/favorites' }"
      to="/favorites"
      >Favorites</nuxt-link
    >
  </div>
</template>

<script setup>
const router = useRouter();
// If the current route is /favorites, add class to corresponding link
const current = computed(() => router.currentRoute.value.path);
</script>

<style scoped lang="scss">
.tab-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.tab-bar__item {
  font-family: var(--display-font);
  text-decoration: none;
  font-size: 1rem;
  color: var(--text-primary-color);
  font-weight: bold;
  padding: 0.5rem;
}

.selected {
  color: var(--text-primary-color);
  border-bottom: 4px solid var(--primary-color);
}
</style>
