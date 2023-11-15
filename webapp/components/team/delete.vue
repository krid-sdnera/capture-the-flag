<script setup lang="ts">
import type { TeamData } from "~/server/types/team";

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  team: TeamData;
}>();

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitDelete() {
  const data = await $fetch(`/api/teams/${props.team.id}`, {
    method: "delete",
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("deleted", data.team.id);
}
</script>

<template>
  <form>
    <h2>Delete Team</h2>

    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="isLoading">
      Delete Team
    </button>
  </form>
</template>
