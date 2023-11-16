<script setup lang="ts">
import type { TrackerCreateInput } from "~/server/types/tracker";

const emit = defineEmits<{
  created: [id: number];
}>();
const newTracker = ref<TrackerCreateInput>({
  name: "",
  scoreModifier: 1,
});

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitCreate() {
  const reqBody: TrackerCreateInput = {
    name: newTracker.value.name,
    scoreModifier: newTracker.value.scoreModifier,
  };
  const data = await $fetch(`/api/trackers`, {
    method: "post",
    body: reqBody,
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("created", data.tracker.id);
}
</script>

<template>
  <form>
    <h2>Create Tracker</h2>
    <div>
      <label for="form-tracker-create-name">Tracker name</label>
      <input id="form-tracker-create-name" v-model="newTracker.name" />
    </div>
    <div>
      <label for="form-tracker-create-score-modifier"
        >Tracker score modifier</label
      >
      <input
        id="form-tracker-create-score-modifier"
        type="number"
        v-model="newTracker.scoreModifier"
      />
    </div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitCreate" :disabled="isLoading">
      Create Tracker
    </button>
  </form>
</template>
