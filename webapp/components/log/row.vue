<script setup lang="ts">
import type { LogData } from "~/server/types/log";

const props = defineProps<{
  log: LogData;
}>();
const log = props.log;

const { useFetchTeam } = useTeam();
const { useFetchTracker } = useTracker();

const { team, loading: teamLoading } = useFetchTeam(log.teamId);
const { tracker, loading: trackerLoading } = useFetchTracker(log.trackerId);
</script>

<template>
  <tr>
    <td>{{ log.id }}</td>
    <td>{{ log.datetime }}</td>
    <td>{{ log.lat }}</td>
    <td>{{ log.long }}</td>
    <td v-if="!trackerLoading">
      {{ tracker?.name }}
    </td>
    <td v-else>Loading</td>
    <td v-if="!teamLoading">
      {{ team?.name }}
    </td>
    <td v-else>Loading</td>
    <td>{{ log.distance }}</td>
    <td><NuxtLink :to="`/logs/${log.id}`">show</NuxtLink></td>
  </tr>
</template>
