<script setup lang="ts">
const props = defineProps<{
  filters: UiFilterControls;
}>();

const filters = props.filters;
</script>

<template>
  <div class="filter-container">
    <div>Filters:</div>
    <div v-for="(value, key) in filters.fields" :key="key" class="filter-field">
      {{ key }}:

      <span v-if="filters.fixedFilters.includes(key)">{{ value.value }}</span>
      <input v-else v-model="filters.fields[key].value" />
    </div>
  </div>
</template>

<style>
.filter-container {
  display: flex;
}
.filter-container .filter-field {
  padding: 0 10px;
}
</style>
