<template>
  <div class="wrapper">
    <div class="row header">
      <div class="cell">
        Name
      </div>
      <div class="cell">
        State/Province
      </div>
      <div class="cell">
        Website
      </div>
      <div class="cell">
      </div>
    </div>
    <div class="row body" v-for="row in rows" :key="row.key">
      <div class="cell">
        {{row.name}}
      </div>
      <div class="cell">
        {{ row.state }}
      </div>
      <div class="cell">
        <p v-for="site in row.website">{{ site }}<br/></p>
      </div>
      <div class="cell">
        <button v-if="!isFavorite(row.key)" class="button" @click="() => handleAdd(row)">
            <img src="/icons/heart.png" alt="Add to favorites" class="button__icon"/>
          </button>
          <button v-else @click="() => handleRemove(row.key)" class="button">
            <img src="/icons/heart-filled.png" alt="Remove from favorites" class="button__icon"/>
          </button>
      </div>
    </div>
  </div>
  <!-- <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>State/Province</th>
        <th>Website</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.key">
        <th>{{ row.name }}</th>
        <th>{{ row.state }}</th>
        <th><p v-for="site in row.website">{{ site }}</p></th>
        <th>
          <button v-if="!isFavorite(row.key)" class="button" @click="() => handleAdd(row)">
            <img src="/icons/heart.png" alt="Add to favorites" class="button__icon"/>
          </button>
          <button v-else @click="() => handleRemove(row.key)" class="button">
            <img src="/icons/heart-filled.png" alt="Remove from favorites" class="button__icon"/>
          </button>
        </th>
      </tr>
    </tbody>
  </table> -->
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    default: []
  },
  isFavorite: {
    type: Function,
    default: (key) => true
  },
  handleAdd: {
    type: Function,
    default: (row) => {}
  },
  handleRemove: {
    type: Function,
    default: (row) => {}
  }
})
</script>

<style scoped lang="scss">
.wrapper{
  width: 100%;
  padding: 2rem;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  line-height: 2rem;
  padding: 0.25rem 0.5rem;

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

  &:first-child {
    width: 100%;
  }
  &:nth-child(2) {
    width: 470px;
  }
  &:nth-child(3) {
    width: 650px;
  }
  &:last-child {
    width: 48px;
  }
  & p {
    line-height: 1rem;
    margin: 0;
  }
}
.button{
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