<template>
  <div>
    <v-row justify="center">
      <v-card class="mx-auto" max-width="70vw" max-height="60vh">
        <img src="../assets/logo.png" alt />

        <v-card-title>
          <h1>lol</h1>
          <span class="grey--text subtitle-1">lol</span>
        </v-card-title>

        <v-card-actions>
          <v-btn class="info" text>Mieten</v-btn>

          <v-btn text color="purple">
            <v-icon>clear</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver.</v-card-text>
      </v-card>
    </v-row>
  </div>
</template>


<script>
export default {
  components: {},
  data: () => ({
    drawer: false,
    item: 1,
    show: false
  })
};
</script>


<style scoped>
.mx-auto {
  position: fixed;
  z-index: 100;
  bottom: 30vh;
}
</style>