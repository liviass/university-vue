<template>
  <div class="wrapper">
    <div class="row header">
      <div class="cell name">Name</div>
      <div class="cell state">State/Province</div>
      <div class="cell website">Website</div>
      <div class="cell favorite"></div>
    </div>
    <div class="row body" v-for="row in rows" :key="row.key">
      <div class="cell name">
        {{ row.name }}
      </div>
      <div class="cell state">
        {{ row.state }}
      </div>
      <div class="cell website">
        <p v-for="site in row.website">{{ site }}<br /></p>
      </div>
      <div class="cell favorite">
        <button
          v-if="!isFavorite(row.key)"
          class="button"
          @click="() => handleAdd(row)"
        >
          <img
            src="/icons/heart.png"
            alt="Add to favorites"
            class="button__icon"
          />
        </button>
        <button v-else @click="() => handleRemove(row.key)" class="button">
          <img
            src="/icons/heart-filled.png"
            alt="Remove from favorites"
            class="button__icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { University } from '../types'

interface Props {
  rows: University[];
  isFavorite?: (key: string) => boolean;
  handleAdd?: (row: University) => void;
  handleRemove?: (key: string) => void;
}
withDefaults(defineProps<Props>(), {
  rows: () => [] as University[],
  isFavorite: () => true,
  handleAdd: () => {},
  handleRemove: () => {},
});
</script>

<style scoped lang="scss">
.wrapper {
  width: calc(100% - 2rem); // 100% - padding
  padding: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  line-height: 2rem;
  padding: 0.25rem 0.5rem;
  width: calc(100% - 1rem); // 100% - padding

  @media (max-width: 62em) {
    display: grid;
    grid-gap: 0;
    grid-template-columns: calc(100% - 24px) 24px;
    grid-template-rows: 1rem 1rem;
    grid-template-areas:
      "name name"
      "state favorite";
  }

  &.header {
    font-weight: bold;
    color: var(--text-secondary-color);
    background-color: var(--primary-color);
  }
  &.body {
    font-size: 0.85rem;
  }
  &:nth-child(even) {
    background-color: var(--secondary-color);
  }
}

.cell {
  align-self: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-height: 2rem;

  &.name {
    width: calc(100% - 1rem);
    @media (max-width: 62em) {
      grid-area: name;
    }
  }
  &.state {
    width: 470px;
    @media (max-width: 62em) {
      grid-area: state;
    }
  }
  &.website {
    width: 650px;
    @media (max-width: 62em) {
      display: none;
      grid-area: website;
    }
  }
  &.favorite {
    width: 48px;
    @media (max-width: 62em) {
      grid-area: favorite;
    }
  }
  & p {
    line-height: 1rem;
    margin: 0;
  }
}
.button {
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;

  &__icon {
    width: 18px;
    height: 18px;
  }
}
</style>
