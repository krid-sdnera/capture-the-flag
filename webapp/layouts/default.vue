<script setup lang="ts"></script>

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
          <li><NuxtLink :to="`/teams`">Team List</NuxtLink></li>
        </ul>
      </div>
    </header>
    <main>
      <div class="breadcrumbs"></div>
      <slot />
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
.app-container * {
  background-color: black;
  color: aliceblue;
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

header ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
header ul li {
  display: block;
  padding: 5px;
}

main {
  margin: 20px;
}
</style>
