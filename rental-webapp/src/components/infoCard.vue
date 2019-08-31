<template>
  <div class="info">
    <v-row justify="center">
      <v-card class="mx-auto" width="70vw" >
        <!-- <img src="../assets/logo.png" alt /> -->

        <v-row justify="center" align="center" style="padding-top:10px" >

        <v-card-title>
          <h1>{{scooter.provider}}</h1>
        </v-card-title>

          <img width="20%" :src="scooter.icon"></img>

      
        </v-row>


          <div style="height:20px"></div>

            <v-row align="center" justify="center" v-if="scooter.battery">

          <v-progress-linear class="battery" :value="scooter.batteryLevel"></v-progress-linear>
          <span>{{scooter.batteryLevel}}%</span>

            </v-row>

          <v-spacer></v-spacer>

            <v-card-actions>
          <v-btn text>Mieten</v-btn>

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

.battery{
  width : 40%;
  border-radius: 20px;
  display: inline-block;
  margin-left: -13%;
  margin-right: 7%;
}
</style>