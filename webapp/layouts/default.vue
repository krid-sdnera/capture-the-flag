<script setup lang="ts">
import type { Breadcrumb } from "~/types/breadcrumbs";
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Capture the Flag` : "Capture the Flag";
  },
});
const route = useRoute();
const breadcrumbs = computed<Breadcrumb[]>(
  () => (route.meta.breadcrumbs as Breadcrumb[]) || [{ to: "/", label: "Home" }]
);
</script>

<template>
  <div class="app-container">
    <header>
      <div class="image-container">
        <img
          src="/images/capture-the-flag-logo.png"
          alt="Capture the Flag Logo"
        />
      </div>
      <div class="navigation-container">
        <ul>
          <li><NuxtLink :to="`/`">Home</NuxtLink></li>
          <li><NuxtLink :to="`/teams`">Teams</NuxtLink></li>
          <li><NuxtLink :to="`/trackers`">Trackers</NuxtLink></li>
          <li><NuxtLink :to="`/logs`">Logs</NuxtLink></li>
          <li><NuxtLink :to="`/stats`">Stats</NuxtLink></li>
        </ul>
      </div>
    </header>
    <main>
      <div class="breadcrumbs">
        <ul>
          <li v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
            <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.to">{{
              crumb.label
            }}</NuxtLink>
            <span v-else>{{ crumb.label }}</span>
          </li>
        </ul>
      </div>
      <slot />

      <WebSocket></WebSocket>
    </main>
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
body,
.app-container {
  background-color: black;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: white;
}

.app-container {
  display: flex;
  align-items: stretch;
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-items: flex-start;
  flex-direction: column;

  padding: 20px;
  border-right: solid 1px lightgray;
}

header img {
  margin-bottom: 20px;
  height: 72px;
  width: 72px;
}

header .navigation-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
header .navigation-container ul li {
  display: block;
  padding: 5px;
}

.breadcrumbs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.breadcrumbs ul li {
  display: inline-block;
  padding: 10px 0;
  padding-left: 10px;
}
.breadcrumbs ul li:not(:last-child)::after {
  content: "/";
  display: inline-block;
  padding-left: 10px;
}

main {
  margin: 20px;
}
</style>
