<script setup lang="ts">
import type { FlagData } from "~/server/types/flag";
const { useDeleteFlag } = useFlag();
const { deleteFn, deleted, loading, error, errorMessage } = useDeleteFlag();

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  flag: FlagData;
}>();

async function submitDelete() {
  const flagId = await deleteFn(props.flag.id);

  if (flagId) {
    emit("deleted", flagId);
  }
}
</script>

<template>
  <form>
    <h2>Delete Flag</h2>

    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="loading || deleted">
      Delete Flag
    </button>
  </form>
</template>
