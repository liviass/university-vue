<template>
  <select :name="name">
    <option v-for="option, i in options" :key="i" :value="option">{{ option }}</option>
  </select>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<style></style>