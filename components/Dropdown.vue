<template>
  <select :name="name" @change="$emit('item-select', $event.target.value)">
    <option v-for="option in options" :key="option.code" :value="option.name" :selected="option.name === selected">{{ option.name }}</option>
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
  },
  selected: {
    type: String,
    required: false,
    default: ''
  }
})

defineEmits(['item-select'])
</script>

<style></style>