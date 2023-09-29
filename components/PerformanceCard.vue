<template>
  <div class="card">
    <h4 class="card__title">API Performance Tracking</h4>
    <p>
      <strong>Response code:</strong> {{ status }}
    </p>
    <p><strong>Response time:</strong> {{ executionTime }}</p>
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
  padding: 18px;
  max-width: fit-content;

  & p {
    line-height: 24px;
    margin: 6px;
  }

  & h4 {
    font-size: 24px;
    margin: 0;
  }
}
</style>