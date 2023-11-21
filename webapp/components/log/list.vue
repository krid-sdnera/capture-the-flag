<script setup lang="ts">
const { useListLogs } = useLog();
const { displayLogs, uiPageControls, refresh, loading, error, errorMessage } =
  useListLogs();

const showLogCreate = useState("showLogCreate", () => false);
function logCreated(newId: number) {
  showLogCreate.value = false;
  refresh();
}
</script>

<template>
  <form>
    <h2>Logs</h2>

    <button type="button" @click="showLogCreate = !showLogCreate">
      {{ showLogCreate ? "Hide" : "Show" }} Create Log
    </button>
    <LogCreate v-if="showLogCreate" @created="logCreated"></LogCreate>

    <div v-if="error">Unable to load log list {{ errorMessage }}</div>
    <div v-else-if="loading">Loading Logs</div>
    <table v-else>
      <thead>
        <tr>
          <th>id</th>
          <th>datetime</th>
          <th>lat</th>
          <th>long</th>
          <th>tracker</th>
          <th>team</th>
          <th>distance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in displayLogs" :key="log.id">
          <td>{{ log.id }}</td>
          <td>{{ log.datetime }}</td>
          <td>{{ log.lat }}</td>
          <td>{{ log.long }}</td>
          <td>{{ log.tracker.name }}</td>
          <td>{{ log.team?.name ?? "none" }}</td>
          <td>{{ log.distance }}</td>
          <td><NuxtLink :to="`/logs/${log.id}`">show</NuxtLink></td>
        </tr>
      </tbody>
    </table>

    <UiPageControls :controls="uiPageControls"></UiPageControls>
  </form>
</template>
