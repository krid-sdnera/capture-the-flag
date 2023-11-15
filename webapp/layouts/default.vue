<script setup lang="ts"></script>

<template>
  <div>
    <ul>
      <li><NuxtLink :to="`/`">Home</NuxtLink></li>
      <li><NuxtLink :to="`/teams`">Team List</NuxtLink></li>
    </ul>
    <slot />
  </div>
</template>
<style>
* {
  background-color: black;
  color: aliceblue;
}
</style>
