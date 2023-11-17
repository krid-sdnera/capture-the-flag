<script setup lang="ts">
const page = ref(1);
const { data, refresh, pending } = useFetch(`/api/logs`, {
  params: { page: page },
});

const hasPrevPage = computed(() => page.value > 2);
const hasNextPage = computed(
  () => data.value && page.value < data.value.maxPages
);

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

    <table v-if="data && data.success === true">
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
        <tr v-for="log in data.logs" :key="log.id">
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

    <button type="button" :disabled="!hasPrevPage" @click="page--">Prev</button>
    Page {{ page }}
    <button type="button" :disabled="!hasNextPage" @click="page++">Next</button>
    <button type="button" :disabled="pending" @click="refresh()">
      Refresh
    </button>
  </form>
</template>
