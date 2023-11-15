<script setup lang="ts">
import type { TeamData, TeamUpdateInput } from "~/server/types/team";

const emit = defineEmits<{
  updated: [id: number];
}>();
const props = defineProps<{
  team: TeamData;
}>();

const newTeam = ref<TeamUpdateInput>({
  id: props.team.id,
  name: props.team.name,
});

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitUpdate() {
  const reqBody: TeamUpdateInput = {
    id: newTeam.value.id,
    name: newTeam.value.name,
  };
  const data = await $fetch(`/api/teams/${props.team.id}`, {
    method: "put",
    body: reqBody,
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("updated", data.team.id);
}
</script>

<template>
  <form>
    <h2>Update Team</h2>
    <div>
      <p>ID: {{ newTeam.id }}</p>
    </div>
    <div>
      <label for="form-team-update-name">Team name</label>
      <input id="form-team-update-name" v-model="newTeam.name" />
    </div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitUpdate" :disabled="isLoading">
      Update Team
    </button>
  </form>
</template>
