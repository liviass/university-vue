<template>
  <select :name="name" @change="$emit('item-select', $event.target.value)">
    <option v-for="option in options" :key="option.code" :value="option.name">{{ option.name }}</option>
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

defineEmits(['item-select'])
</script>

<style></style>