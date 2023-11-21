<script setup lang="ts">
import type { LogData } from "~/server/types/log";
const { useDeleteLog } = useLog();
const { deleteFn, deleted, loading, error, errorMessage } = useDeleteLog();

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  log: LogData;
}>();

async function submitDelete() {
  const logId = await deleteFn(props.log.id);

  if (logId) {
    emit("deleted", logId);
  }
}
</script>

<template>
  <form>
    <h2>Delete Log</h2>

    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="loading || deleted">
      Delete Log
    </button>
  </form>
</template>
