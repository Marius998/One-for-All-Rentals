<template>
  <v-app class="app">
    <appBar />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import appBar from "./components/appBar";

export default {
  name: "App",
  components: {
    appBar,
  },
};
</script>

<style scoped>
.app {
  overflow: hidden;
  position: fixed;
}
</style>
