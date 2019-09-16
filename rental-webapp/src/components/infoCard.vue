<template>
  <div>
    <div class="infoCard">
      <v-card-title class="title">
        <p class="display-3">{{scooter.provider}}</p>
        <img class="providerLogo" :src="scooter.logo" />
      </v-card-title>

      <v-card-text class="flex-box">
        <div>
          <v-chip class="ma-2" color="white" text-color="black" large>
            <v-icon left>directions_bike</v-icon>
            {{scooter.id}}
          </v-chip>

          <v-chip class="ma-2" color="white" text-color="black" large>
            <v-icon left>done_all</v-icon>available
          </v-chip>
        </div>

        <img class="vehicleImg" :src="scooter.vehicleImg" />
      </v-card-text>


      <v-row style="margin-top: 20px;" class="flex-box" v-if="scooter.battery">
        <v-progress-linear class="battery" :value="scooter.batteryLevel"></v-progress-linear>
        <v-chip class="ma-1" color="white" text-color="black" large>
            {{scooter.batteryLevel}}%<v-icon right="">battery_charging_full</v-icon>
          </v-chip>
      </v-row>

      <v-card-actions class="flex-box">
        <v-btn large class="rentBtn">Ausleihen</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>


<script>
export default {
  components: {},

  props: ['scooter'],

  data: () => ({
    drawer: false
  })
};
</script>


<style scoped>
.infoCard {
  width: 100vw;
  position: absolute;
  bottom: 0;
  z-index: 100;
  background-image: linear-gradient(135deg, #fff720 10%, #3cd500 100%);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.8);
}

.flex-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.title {
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 10px;
}

.ma-1 {
  width: 25vw;
  display: flex;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
}

.ma-2 {
  width: 40vw;
  display: flex;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
}

.rentBtn {
  width: 85%;
  bottom: 2vh;
  margin-top: 40px;
  background-color: white;
  text-transform: uppercase;
}

.providerLogo {
  width: 10%;
  margin-left: 20px;
  margin-bottom: 15px;
}

.vehicleImg {
  width: 30%;
}

.battery {
  width: 40%;
  border-radius: 20px;
  display: inline-block;
  
}
</style>