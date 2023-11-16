<script setup lang="ts">
const page = ref(1);
const { data, refresh, pending } = useFetch(`/api/trackers`, {
  params: { page: page },
});

const hasPrevPage = computed(() => page.value > 2);
const hasNextPage = computed(
  () => data.value && page.value < data.value.maxPages
);

const showTrackerCreate = useState("showTrackerCreate", () => false);
function trackerCreated(newId: number) {
  showTrackerCreate.value = false;
  refresh();
}
</script>

<template>
  <form>
    <h2>Trackers</h2>

    <button type="button" @click="showTrackerCreate = !showTrackerCreate">
      {{ showTrackerCreate ? "Hide" : "Show" }} Create Tracker
    </button>
    <TrackerCreate
      v-if="showTrackerCreate"
      @created="trackerCreated"
    ></TrackerCreate>

    <table v-if="data && data.success === true">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>scoreModifier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tracker in data.trackers" :key="tracker.id">
          <td>{{ tracker.id }}</td>
          <td>{{ tracker.name }}</td>
          <td>x{{ tracker.scoreModifier }}</td>
          <td><NuxtLink :to="`/trackers/${tracker.id}`">show</NuxtLink></td>
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
