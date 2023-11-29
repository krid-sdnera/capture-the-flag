<script setup lang="ts">
import type { ActionData } from "~/server/types/action";
const { useDeleteAction } = useAction();
const { deleteFn, deleted, loading, error, errorMessage } = useDeleteAction();

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  action: ActionData;
}>();

async function submitDelete() {
  const actionId = await deleteFn(props.action.id);

  if (actionId) {
    emit("deleted", actionId);
  }
}
</script>

<template>
  <form>
    <h2>Delete Action</h2>

    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="loading || deleted">
      Delete Action
    </button>
  </form>
</template>
