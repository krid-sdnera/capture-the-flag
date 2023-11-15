<script setup lang="ts">
const page = ref(1);
const { data, refresh, pending } = useFetch(`/api/teams`, {
  params: { page: page },
});

const hasPrevPage = computed(() => page.value > 2);
const hasNextPage = computed(() => page.value < data.value.maxPages);

const showTeamCreate = useState("showTeamCreate", () => false);
function teamCreated(newId: number) {
  showTeamCreate.value = false;
  refresh();
}
</script>

<template>
  <form>
    <h2>Teams</h2>

    <button type="button" @click="showTeamCreate = !showTeamCreate">
      {{ showTeamCreate ? "Hide" : "Show" }} Create Team
    </button>
    <TeamCreate v-if="showTeamCreate" @created="teamCreated"></TeamCreate>

    <table v-if="data && data.success === true">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in data.teams" :key="team.id">
          <td>{{ team.id }}</td>
          <td>{{ team.name }}</td>
          <td><NuxtLink :to="`/teams/${team.id}`">show</NuxtLink></td>
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
