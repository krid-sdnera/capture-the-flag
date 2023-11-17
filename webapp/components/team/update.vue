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
  flagZoneLat: props.team.flagZoneLat,
  flagZoneLong: props.team.flagZoneLong,
});

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitUpdate() {
  const reqBody: TeamUpdateInput = {
    id: newTeam.value.id,
    name: newTeam.value.name,
    flagZoneLat: newTeam.value.flagZoneLat,
    flagZoneLong: newTeam.value.flagZoneLong,
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
    <div>
      <label for="form-team-update-lat">Lat</label>
      <input
        type="number"
        id="form-team-update-lat"
        v-model="newTeam.flagZoneLat"
      />
    </div>
    <div>
      <label for="form-team-update-long">Long</label>
      <input
        type="number"
        id="form-team-update-long"
        v-model="newTeam.flagZoneLong"
      />
    </div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitUpdate" :disabled="isLoading">
      Update Team
    </button>
  </form>
</template>
