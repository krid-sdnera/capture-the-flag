<script setup lang="ts">
const { initialise, logs, sendMessage } = useWebSockets();

if (process.client) {
  onMounted(() => initialise());
}

const currentMessage = ref<string>("");
</script>

<template>
  <div>
    <pre><code>{{ logs.join('\n') }}</code></pre>
    <input v-model="currentMessage" />
    <button type="button" @click="sendMessage('status', currentMessage)">
      Send message
    </button>
  </div>
</template>
