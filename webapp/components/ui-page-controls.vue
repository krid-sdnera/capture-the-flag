<script setup lang="ts">
const props = defineProps<{
  controls: UiPageControls;
}>();

const controls = props.controls;
</script>

<template>
  <div>
    <button
      type="button"
      :disabled="!controls.hasPrevPage.value"
      @click="controls.changePage(-1)"
    >
      Prev
    </button>
    Page {{ controls.currentPage }} of {{ controls.maxPages }}
    <button
      type="button"
      :disabled="!controls.hasNextPage.value"
      @click="controls.changePage(1)"
    >
      Next
    </button>

    <button
      type="button"
      :disabled="controls.loading.value"
      @click="controls.refresh()"
    >
      Refresh
    </button>
  </div>
</template>

<style>
button[disabled] {
  color: darkgray;
}
</style>
