<script setup lang="ts">
import { useBreadcrumbs } from "~/types/breadcrumbs";

useHead({
  title: "Dashboard",
});

definePageMeta({
  breadcrumbs: useBreadcrumbs([{ to: `/`, label: `Home` }]),
});
</script>

<template>
  <div>
    <h2>Hello</h2>
  </div>
</template>
