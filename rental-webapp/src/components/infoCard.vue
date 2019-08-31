<template>
  <div>
    <v-row justify="center">
      <v-card class="mx-auto" max-width="70vw" max-height="60vh">
        <!-- <img src="../assets/logo.png" alt /> -->

        <v-card-title>
          <h1>{{scooter.provider}}</h1>
        </v-card-title>
      

        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver.</v-card-text>

          <v-spacer></v-spacer>

            <v-card-actions>
          <v-btn class="info" text>Mieten</v-btn>

          <v-btn text color="purple">
            <v-icon>clear</v-icon>
          </v-btn>

        </v-card-actions>
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
  }),
  props : {
    scooter : Object
  }
};
</script>


<style scoped>
.mx-auto {
  position: fixed;
  z-index: 100;
  bottom: 20vh;
}
</style>