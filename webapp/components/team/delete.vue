<script setup lang="ts">
import type { TeamData } from "~/server/types/team";
const { useDeleteTeam } = useTeam();
const { deleteFn, deleted, loading, error, errorMessage } = useDeleteTeam();

const emit = defineEmits<{
  deleted: [id: number];
}>();
const props = defineProps<{
  team: TeamData;
}>();

async function submitDelete() {
  const teamId = await deleteFn(props.team.id);

  if (teamId) {
    emit("deleted", teamId);
  }
}
</script>

<template>
  <form>
    <h2>Delete Team</h2>

    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitDelete" :disabled="loading || deleted">
      Delete Team
    </button>
  </form>
</template>
