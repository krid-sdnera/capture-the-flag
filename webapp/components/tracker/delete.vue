<script setup lang="ts">
import type { TrackerData } from "~/server/types/tracker";

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  tracker: TrackerData;
}>();

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitDelete() {
  const data = await $fetch(`/api/trackers/${props.tracker.id}`, {
    method: "delete",
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("deleted", data.tracker.id);
}
</script>

<template>
  <form>
    <h2>Delete Tracker</h2>

    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="isLoading">
      Delete Tracker
    </button>
  </form>
</template>
