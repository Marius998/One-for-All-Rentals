<template>
  <div>
    <v-card class="infoCard" height="60vh" :color="scooter.color">
      <v-card-title class="display-2 white--text">
        {{scooter.provider }}
        <v-avatar>
          <img class="providerLogo" :src="scooter.logo" alt="providerLogo" />
        </v-avatar>
      </v-card-title>
      <v-card-text class="flex-box-infoCard">
        <div>
          <v-chip class="info-chip" color="white" text-color="black" large>
            <v-icon left>attach_money</v-icon>
            {{scooter.pricePerUnit}}
          </v-chip>

          <div v-if="scooter.provider == 'Nextbike'">
            <v-chip class="info-chip" color="white" text-color="black" large>
              <v-icon left>directions_bike</v-icon>
              {{scooter.id}}
            </v-chip>
          </div>

          <v-chip
            class="info-chip"
            :href="scooter.website"
            color="white"
            dark
            text-color="black"
            large
          >
            <v-icon left>info</v-icon>Infos
          </v-chip>
        </div>

        <img class="vehicle-img" :src="scooter.vehicleImg" />
      </v-card-text>

      <v-row style="margin-top: 5px;" class="flex-box-battery" v-if="scooter.battery">
        <v-progress-linear class="battery" :value="scooter.batteryLevel" height="20" color="white"></v-progress-linear>
        <v-chip class="battery-chip" color="white" text-color="black" large>
          <v-icon left>battery_charging_full</v-icon>
          {{scooter.batteryLevel}}%
        </v-chip>
      </v-row>

      <v-card-actions class="flex-box-infoCard">
        <v-btn :href="scooter.deeplink" large class="rent-btn">Ausleihen</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
export default {
  components: {},

  props: ["scooter"],

  data: () => ({
    //
  })
};
</script>


<style scoped>
.display-2 {
  margin-bottom: 25px;
  margin-left: 10px;
}

.providerLogo {
  margin-left: 25px;
  border: 2px solid white;
}

.infoCard {
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 100;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.8);
}

.flex-box-infoCard {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info-chip {
  width: 35vw;
  display: flex;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  margin-left: -12.5px;
}

.vehicle-img {
  width: 40%;
  margin-top: -20px;
}

.flex-box-battery {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.battery {
  width: 50%;
  border-radius: 20px;
}

.battery-chip {
  width: 25vw;
  display: flex;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
}

.rent-btn {
  width: 90%;
  position: fixed;
  bottom: 3vh;
  background-color: white;
  text-transform: uppercase;
}
</style>