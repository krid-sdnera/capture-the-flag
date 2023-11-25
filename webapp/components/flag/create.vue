<script setup lang="ts">
import type { FlagCreateInput } from "~/server/types/flag";
const { useCreateFlag } = useFlag();
const { create, created, loading, error, errorMessage } = useCreateFlag();

const emit = defineEmits<{
  created: [id: number];
}>();
const newFlag = ref<FlagCreateInput>({
  datetime: new Date().toISOString(),
  windowSize: 0,
  scoreModifier: 0,
  lat: 0,
  long: 0,
  trackerId: 0,
  teamId: 0,
  distance: 0,
});

async function submitCreate() {
  const reqBody: FlagCreateInput = {
    datetime: newFlag.value.datetime,
    windowSize: newFlag.value.windowSize,
    scoreModifier: newFlag.value.scoreModifier,
    lat: newFlag.value.lat,
    long: newFlag.value.long,
    trackerId: newFlag.value.trackerId,
    teamId: newFlag.value.teamId,
    distance: newFlag.value.distance,
  };
  const flagId = await create(reqBody);

  if (flagId) {
    emit("created", flagId);
  }
}
</script>

<template>
  <form>
    <h2>Create Flag</h2>
    <div>
      <label for="form-flag-update-window-size">windowSize</label>
      <input
        type="number"
        id="form-flag-update-window-size"
        v-model="newFlag.windowSize"
      />
    </div>
    <div>
      <label for="form-flag-update-score-modifier">scoreModifier</label>
      <input
        type="number"
        id="form-flag-update-score-modifier"
        v-model="newFlag.scoreModifier"
      />
    </div>
    <div>
      <label for="form-log-create-lat">Lat</label>
      <input type="number" id="form-log-create-lat" v-model="newFlag.lat" />
    </div>
    <div>
      <label for="form-log-create-long">Long</label>
      <input type="number" id="form-log-create-long" v-model="newFlag.long" />
    </div>
    <div>
      <label for="form-log-create-tracker">Tracker</label>
      <input id="form-log-create-tracker" v-model="newFlag.trackerId" />
    </div>
    <div>
      <label for="form-log-create-team">Team</label>
      <input id="form-log-create-team" v-model="newFlag.teamId" />
    </div>
    <div>
      <label for="form-log-create-distance">Distance</label>
      <input
        type="number"
        id="form-log-create-distance"
        v-model="newFlag.distance"
      />
    </div>
    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitCreate" :disabled="loading || created">
      Create Flag
    </button>
  </form>
</template>
