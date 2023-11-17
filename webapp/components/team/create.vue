<script setup lang="ts">
import type { TeamCreateInput } from "~/server/types/team";

const emit = defineEmits<{
  created: [id: number];
}>();
const newTeam = ref<TeamCreateInput>({ name: "" });

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

async function submitCreate() {
  const reqBody: TeamCreateInput = {
    name: newTeam.value.name,
    flagZoneLat: newTeam.value.flagZoneLat,
    flagZoneLong: newTeam.value.flagZoneLong,
  };
  const data = await $fetch(`/api/teams`, {
    method: "post",
    body: reqBody,
  });

  if (data.success === false) {
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = data.message ?? "";
    return;
  }

  emit("created", data.team.id);
}
</script>

<template>
  <form>
    <h2>Create Team</h2>
    <div>
      <label for="form-team-create-name">Team name</label>
      <input id="form-team-create-name" v-model="newTeam.name" />
    </div>
    <div>
      <label for="form-team-create-lat">Lat</label>
      <input
        type="number"
        id="form-team-create-lat"
        v-model="newTeam.flagZoneLat"
      />
    </div>
    <div>
      <label for="form-team-create-long">Long</label>
      <input
        type="number"
        id="form-team-create-long"
        v-model="newTeam.flagZoneLong"
      />
    </div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <button type="button" @click="submitCreate" :disabled="isLoading">
      Create Team
    </button>
  </form>
</template>
