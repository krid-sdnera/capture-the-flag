// import functions from "./sockets/index";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt3-socket.io"],
  runtimeConfig: {
    mqtt: {
      host: "mqtt://au1.cloud.thethings.network:1883",
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_API_KEY,
    },
    public: {
      flagCapturedDistance: 50,
      flagWindowIntervalMinutes: 5,
    },
  },
});
