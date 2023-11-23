<script setup lang="ts">
import type { LogCreateInput } from "~/server/types/log";
const { useCreateLog } = useLog();
const { create, created, loading, error, errorMessage } = useCreateLog();

const emit = defineEmits<{
  created: [id: number];
}>();
const newLog = ref<LogCreateInput>({
  datetime: new Date().toISOString(),
  lat: 0,
  long: 0,
  trackerId: 0,
  teamId: 0,
  distance: 0,
});

async function submitCreate() {
  const reqBody: LogCreateInput = {
    datetime: newLog.value.datetime,
    lat: newLog.value.lat,
    long: newLog.value.long,
    trackerId: newLog.value.trackerId,
    teamId: newLog.value.teamId,
    distance: newLog.value.distance,
  };
  const logId = await create(reqBody);

  if (logId) {
    emit("created", logId);
  }
}
</script>

<template>
  <form>
    <h2>Create Log</h2>
    <div>
      <label for="form-log-create-datetime">Datetime</label>
      <input id="form-log-create-datetime" v-model="newLog.datetime" />
    </div>
    <div>
      <label for="form-log-create-lat">Lat</label>
      <input type="number" id="form-log-create-lat" v-model="newLog.lat" />
    </div>
    <div>
      <label for="form-log-create-long">Long</label>
      <input type="number" id="form-log-create-long" v-model="newLog.long" />
    </div>
    <div>
      <label for="form-log-create-tracker">Tracker</label>
      <input id="form-log-create-tracker" v-model="newLog.trackerId" />
    </div>
    <div>
      <label for="form-log-create-team">Team</label>
      <input id="form-log-create-team" v-model="newLog.teamId" />
    </div>
    <div>
      <label for="form-log-create-distance">Distance</label>
      <input
        type="number"
        id="form-log-create-distance"
        v-model="newLog.distance"
      />
    </div>
    <div v-if="error">{{ errorMessage }}</div>
    <button type="button" @click="submitCreate" :disabled="loading || created">
      Create Log
    </button>
  </form>
</template>