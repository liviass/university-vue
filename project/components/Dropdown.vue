<template>
  <select class="dropdown" :name="name" @change="handleChange">
    <option v-for="option in options" :key="option.code" :value="option.name" :selected="option.name === selected">{{ option.name }}</option>
  </select>
</template>

<script setup lang="ts">
import type { Option } from '../types'

interface Props {
  options: Option[]
  name: string
  selected?: string
}

const props = withDefaults(defineProps<Props>(), {
  // options: () => [], // required fields wouldn't need default values
  // name: '',
  selected: ''
});

const emit = defineEmits<{
  // (e: 'item-select', value: string) : void
  'item-select': [value: string] // same as above
}>();

const handleChange = (event: Event) => {
  emit('item-select', (event.target as HTMLSelectElement).value)
}

</script>

<style scoped lang="scss">
.dropdown {
  line-height: 2rem;
  font-family: var(--display-font);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  height: 2rem;
}
</style>