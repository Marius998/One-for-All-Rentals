<template>
  <v-app>
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
    appBar
  },
  data: () => ({
    //
  })
};
</script>
