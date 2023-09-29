<template>
  <div class="card">
    <h6 class="card__title">API Performance Tracking</h6>
    <p>
      <strong>Response code:</strong> {{ status }}
    </p>
    <p><strong>Response time (in miliseconds):</strong> {{ executionTime }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  status: {
    type: Number,
    required: true
  },
  executionTime: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss">
.card {
  box-shadow: 0 0 10px var(--box-shadow-color);
  border-radius: 6px;
  padding: 1rem;
  max-width: fit-content;

  & h6 {
    font-size: 1rem;
    margin: 0;
    color: var(--primary-color);
  }

  & p {
    font-size: 0.75rem;
    margin: 0.25rem;
  }
}
</style>