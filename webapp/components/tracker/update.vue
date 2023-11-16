<script setup lang="ts">
import type { TrackerData, TrackerUpdateInput } from "~/server/types/tracker";

const emit = defineEmits<{
  updated: [id: number];
}>();
const props = defineProps<{
  tracker: TrackerData;
}>();

const newTracker = ref<TrackerUpdateInput>({
  id: props.tracker.id,
  name: props.tracker.name,
  scoreModifier: props.tracker.scoreModifier,
});

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitUpdate() {
  const reqBody: TrackerUpdateInput = {
    id: newTracker.value.id,
    name: newTracker.value.name,
    scoreModifier: newTracker.value.scoreModifier,
  };
  const data = await $fetch(`/api/trackers/${props.tracker.id}`, {
    method: "put",
    body: reqBody,
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("updated", data.tracker.id);
}
</script>

<template>
  <form>
    <h2>Update Tracker</h2>
    <div>
      <p>ID: {{ newTracker.id }}</p>
    </div>
    <div>
      <label for="form-tracker-update-name">Tracker name</label>
      <input id="form-tracker-update-name" v-model="newTracker.name" />
    </div>
    <div>
      <label for="form-tracker-update-score-modifier">
        Tracker score modifier
      </label>
      <input
        id="form-tracker-update-score-modifier"
        type="number"
        v-model="newTracker.scoreModifier"
      />
    </div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitUpdate" :disabled="isLoading">
      Update Tracker
    </button>
  </form>
</template>
