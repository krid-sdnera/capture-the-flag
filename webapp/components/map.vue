<script setup lang="ts">
const { useListAllTeams, teams } = useTeam();
const {
  pending: teamPending,
  error: teamError,
  errorMessage: teamErrorMessage,
} = useListAllTeams();

const { useListAllLogs, logs } = useLog();
const {
  pending: logPending,
  error: logError,
  errorMessage: logErrorMessage,
} = useListAllLogs();

const teamsWithLocations = computed(() => {
  return Object.values(teams.value).filter(
    (team) => team.flagZoneLat && team.flagZoneLong
  );
});
const logsWithLocations = computed(() => {
  return Object.values(logs.value).filter((team) => team.lat && team.long);
});

const initialCenter = { lat: -37.75011006689245, lng: 144.8561244333282 };

const openedMarkerTeamID = ref<number | null>(null);
function openMarkerTeam(id: number | null) {
  openedMarkerTeamID.value = id;
}
const openedMarkerFlagID = ref<number | null>(null);
function openMarkerFlag(id: number | null) {
  openedMarkerFlagID.value = id;
}

import placeBlue from "@/assets/images/place_blue_24dp.svg";
import placeRed from "@/assets/images/place_red_24dp.svg";
</script>

<template>
  <div v-if="!teamPending && !logPending">
    <ClientOnly>
      <GMapMap
        :center="initialCenter"
        :zoom="15"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
        }"
        map-type-id="terrain"
        style="width: 500px; height: 300px; margin: auto"
      >
        <!-- Team Flag Zone Circles -->
        <GMapCircle
          :key="team.id"
          v-for="team in teamsWithLocations"
          :radius="7"
          :center="{ lat: team.flagZoneLat, lng: team.flagZoneLong }"
        />
        <!-- Team Flag Zone Markers -->
        <GMapMarker
          v-for="team in teamsWithLocations"
          :key="team.id"
          :position="{ lat: team.flagZoneLat, lng: team.flagZoneLong }"
          :clickable="true"
          :icon="{ url: placeBlue, scaledSize: { width: 40, height: 40 } }"
          @click="openMarkerTeam(team.id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarkerTeam(null)"
            :opened="openedMarkerTeamID === team.id"
          >
            <div style="color: black !important">
              {{ team.name }}
              <NuxtLink
                :to="`/teams/${team.id}`"
                style="color: black !important"
              >
                Details
              </NuxtLink>
            </div>
          </GMapInfoWindow>
        </GMapMarker>

        <!-- Last Flag Positions -->

        <GMapMarker
          v-for="flagLocation in logsWithLocations"
          :key="flagLocation.id"
          :position="{ lat: flagLocation.lat, lng: flagLocation.long }"
          :clickable="true"
          :icon="{ url: placeRed, scaledSize: { width: 40, height: 40 } }"
          @click="openMarkerFlag(flagLocation.id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarkerFlag(null)"
            :opened="openedMarkerFlagID === flagLocation.id"
          >
            <div style="color: black !important">Info Here</div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </ClientOnly>
  </div>
</template>
