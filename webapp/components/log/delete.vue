<script setup lang="ts">
import type { LogData } from "~/server/types/log";

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  log: LogData;
}>();

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitDelete() {
  const data = await $fetch(`/api/logs/${props.log.id}`, {
    method: "delete",
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("deleted", data.log.id);
}
</script>

<template>
  <form>
    <h2>Delete Log</h2>

    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="isLoading">
      Delete Log
    </button>
  </form>
</template>
