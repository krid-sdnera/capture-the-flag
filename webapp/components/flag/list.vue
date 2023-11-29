<script setup lang="ts">
import type { TeamData } from "~/server/types/team";
import type { TrackerData } from "~/server/types/tracker";
import { parseQueryParamAsNumber } from "~/utils/queryParams";

const props = defineProps<{
  team?: TeamData;
  tracker?: TrackerData;
}>();

const { useListFlags } = useFlag();
const { displayFlags, uiPageControls, refresh, loading, error, errorMessage } =
  useListFlags({
    where: {
      teamId: props.team?.id ?? parseQueryParamAsNumber("teamId"),
      trackerId: props.tracker?.id ?? parseQueryParamAsNumber("trackerId"),
    },
  });

const showFlagCreate = useState("showFlagCreate", () => false);
function flagCreated(newId: number) {
  showFlagCreate.value = false;
  refresh();
}
</script>

<template>
  <form>
    <h2>Flags</h2>

    <button type="button" @click="showFlagCreate = !showFlagCreate">
      {{ showFlagCreate ? "Hide" : "Show" }} Create Flag
    </button>
    <FlagCreate
      v-if="showFlagCreate"
      @created="flagCreated"
      :tracker="props.tracker"
      :team="props.team"
    ></FlagCreate>

    <div v-if="error">Unable to load flag list {{ errorMessage }}</div>
    <div v-else-if="loading">Loading Flags</div>
    <table v-else>
      <thead>
        <tr>
          <th>id</th>
          <th>datetime</th>
          <th>windowSize</th>
          <th>scoreModifier</th>
          <th>lat</th>
          <th>long</th>
          <th>tracker</th>
          <th>team</th>
          <th>distance</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flag in displayFlags" :key="flag.id">
          <td>{{ flag.id }}</td>
          <td>{{ flag.datetime }}</td>
          <td>{{ flag.windowSize }}</td>
          <td>{{ flag.scoreModifier }}</td>
          <td>{{ flag.lat }}</td>
          <td>{{ flag.long }}</td>
          <td>
            <NuxtLink :to="`/trackers/${flag.trackerId}`">{{
              flag.trackerId
            }}</NuxtLink>
          </td>
          <td>
            <NuxtLink :to="`/teams/${flag.teamId}`">{{ flag.teamId }}</NuxtLink>
          </td>
          <td>{{ flag.distance }}</td>
          <td><NuxtLink :to="`/flags/${flag.id}`">show</NuxtLink></td>
        </tr>
      </tbody>
    </table>

    <UiPageControls :controls="uiPageControls"></UiPageControls>
  </form>
</template>
