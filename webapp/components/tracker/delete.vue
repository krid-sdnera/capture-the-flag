<script setup lang="ts">
import type { TrackerData } from "~/server/types/tracker";
const { useDeleteTracker } = useTracker();
const { deleteFn, deleted, loading, error, errorMessage } = useDeleteTracker();

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  tracker: TrackerData;
}>();

async function submitDelete() {
  const trackerId = await deleteFn(props.tracker.id);

  if (trackerId) {
    emit("deleted", trackerId);
  }
}
</script>

<template>
  <form>
    <h2>Delete Tracker</h2>

    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="loading || deleted">
      Delete Tracker
    </button>
  </form>
</template>
