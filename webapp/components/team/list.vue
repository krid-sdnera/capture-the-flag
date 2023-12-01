<script setup lang="ts">
const { useListTeams } = useTeam();
const { displayTeams, uiPageControls, refresh, loading, error, errorMessage } =
  useListTeams();

const showTeamCreate = useState("showTeamCreate", () => false);
function teamCreated(newId: number) {
  showTeamCreate.value = false;
  refresh();
}
</script>

<template>
  <div>
    <h2>Teams</h2>

    <button type="button" @click="showTeamCreate = !showTeamCreate">
      {{ showTeamCreate ? "Hide" : "Show" }} Create Team
    </button>
    <TeamCreate v-if="showTeamCreate" @created="teamCreated"></TeamCreate>

    <div v-if="error">Unable to load team list {{ errorMessage }}</div>
    <div v-else-if="loading">Loading Teams</div>
    <table v-else>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>lat</th>
          <th>long</th>
          <th>flags</th>
          <th>logs</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in displayTeams" :key="team.id">
          <td>{{ team.id }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.flagZoneLat }}</td>
          <td>{{ team.flagZoneLong }}</td>
          <td>
            <NuxtLink :to="`/flags?teamId=${team.id}`">view flags</NuxtLink>
          </td>
          <td>
            <NuxtLink :to="`/logs?teamId=${team.id}`">view logs</NuxtLink>
          </td>
          <td><NuxtLink :to="`/teams/${team.id}`">show</NuxtLink></td>
        </tr>
      </tbody>
    </table>

    <UiPageControls :controls="uiPageControls"></UiPageControls>
  </div>
</template>
