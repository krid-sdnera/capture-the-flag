// import functions from "./sockets/index";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt3-socket.io"],
  build: { transpile: ["@fawmi/vue-google-maps"] },
  runtimeConfig: {
    mqtt: {
      host: "mqtt://au1.cloud.thethings.network:1883",
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_API_KEY,
    },
    public: {
      flagCapturedDistance: 50,
      flagWindowIntervalMinutes: 1,
      flagKeepAliveMinutes: 60,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
    },
  },
});
