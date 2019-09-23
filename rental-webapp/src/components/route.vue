<template>
  <transition enter-active-class="animated slideInDown">
    <div class="overlay-card">
      <v-row align="center" justify="center">
        <v-card class="top-card" color="white" tile>
          <v-card-title class="card-search-bar">
            <v-text-field
              color="#242f3e"
              v-model="destination"
              label="Ziel eingeben..."
              :loading="loading"
              clearable
              @click:clear="distance = undefined; searchStarted = false"
              append-icon="search"
              @click:append="getRoute"
              @keydown.enter="getRoute"
            ></v-text-field>
          </v-card-title>
        </v-card>

        <div class="second_card" v-if="distance">
          <v-card class="distance-card" color="transparent" text-color="black" flat large>
            <v-row align="center" justify="center">
              <v-chip class="ma-2" color="white" text-color="black">
                <v-icon left>navigation</v-icon>
                {{ distance }} km
              </v-chip>
            </v-row>
          </v-card>

          <v-container fluid>
            <v-row>
              <v-col v-for="(provider, i) in provider" :key="i" class="flex-box">
                <v-card :color="provider.color" dark>
                  <v-list-item three-line>
                    <v-list-item-content class="align-self-start">
                      <v-list-item-title class="headline mb-2" v-text="provider.name"></v-list-item-title>

                      <v-list-item-subtitle v-text="provider.type"></v-list-item-subtitle>

                      <div class="flex-box-item">
                        <v-chip class="ma-2" color="white" text-color="black">
                          <v-icon small left>query_builder</v-icon>
                          {{ provider.duration}} Minuten
                        </v-chip>

                        <v-chip class="ma-2" color="white" text-color="black">
                          <v-icon small left>euro</v-icon>
                          {{ provider.priceCurrentRide }}
                        </v-chip>
                      </div>
                    </v-list-item-content>

                    <v-img :src="provider.src" max-width="40vw"></v-img>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-row>
    </div>
  </transition>
</template>


<script>
import { constants } from "crypto";

export default {
  props: ["userPos"],

  data() {
    return {
      searchStarted: false,

      routeData: {
        bikeDistance: undefined,
        bikeDuration: undefined,
        moppedDistance: undefined,
        moppedDuration: undefined
      },

      distance: undefined,

      destination: undefined,

      provider: [
        {
          name: "Rhingo",
          pricePerMinute: true,
          pricePerUnit: 0.23,
          startPrice: 0,
          bikeRoute: false,
          choosen: true,
          color: "#E30614",
          src: require("../assets/images/rhingo.png"),
          type: "Motorroller",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        },
        {
          name: "NextBike",
          choosen: true,
          pricePerMinute: false,
          pricePerUnit: 1,
          startPrice: 0,
          bikeRoute: true,
          color: "#194A97",
          src: require("../assets/images/nextbike.png"),
          type: "Fahrrad",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        },
        {
          name: "FordBike",
          choosen: true,
          pricePerMinute: false,
          pricePerUnit: 1,
          startPrice: 0,
          bikeRoute: true,
          color: "#3D8999",
          src: require("../assets/images/fordbike.png"),
          type: "Fahrrad",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        },
        {
          name: "Tier",
          choosen: true,
          pricePerMinute: true,
          pricePerUnit: 0.15,
          startPrice: 1,
          bikeRoute: true,
          color: "#69D2AA",
          src: require("../assets/images/tier.png"),
          type: "E-Scooter",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        },
        {
          name: "Lime",
          choosen: true,
          pricePerMinute: true,
          pricePerUnit: 0.2,
          startPrice: 1,
          bikeRoute: true,
          color: "#46DD00",
          src: require("../assets/images/lime.png"),
          type: "E-Scooter",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        }
      ]
    };
  },

  methods: {
    getBikeRoute() {
      var key = "AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc";
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";
      var origin = this.userPos.lat + "," + this.userPos.lng;

      var apiBike =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        origin +
        "&destination=" +
        this.destination +
        "&mode=bicycling&key=" +
        key;

      return fetch(proxyUrl + apiBike)
        .then(res => res.json())
        .then(data => {
          console.log("bikeFetched");
          this.routeData.bikeDistance = data.routes[0].legs[0].distance.value;
          this.routeData.bikeDuration = data.routes[0].legs[0].duration.value;
        })
        .catch(function() {
          console.log("errorBikeFetch");
        });
    },

    getMoppedRoute() {
      var key = "AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc";
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";
      var origin = this.userPos.lat + "," + this.userPos.lng;

      console.log(origin);

      var apiMoped =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        origin +
        "&destination=" +
        this.destination +
        "&mode=driving&avoid=highways&key=" +
        key;

      return fetch(proxyUrl + apiMoped)
        .then(res => res.json())
        .then(data => {
          console.log("moppedFetched");
          this.routeData.moppedDistance = data.routes[0].legs[0].distance.value;
          this.routeData.moppedDuration = data.routes[0].legs[0].duration.value;
        })
        .catch(function() {
          console.log("errorMopedFetch");
        });
    },

    getRoutes() {
      return Promise.all([this.getBikeRoute(), this.getMoppedRoute()]);
    },

    getRoute: function() {
      this.searchStarted = true;

      console.log("Route wird berechnet...");

      this.getRoutes().then(([bikes, moppeds]) => {
        this.calculatePrice();
      });
    },

    calculatePrice() {
      this.provider.forEach(provider => {
        if (provider.bikeRoute) {
          provider.distance = Math.round(this.routeData.bikeDistance / 1000);
          this.distance = provider.distance;
          provider.duration = Math.round(this.routeData.bikeDuration / 60);
        } else {
          provider.distance = Math.round(this.routeData.moppedDistance / 1000);
          provider.duration = Math.round(this.routeData.moppedDuration / 60);
        }

        if (provider.pricePerMinute) {
          provider.priceCurrentRide =
            Math.round(
              (provider.startPrice +
                provider.pricePerUnit * provider.duration) *
                100
            ) / 100;
        } else {
          provider.priceCurrentRide =
            provider.startPrice +
            Math.ceil((provider.pricePerUnit * provider.duration) / 30);
        }
      });
    }
  },

  computed: {
    loading() {
      if (this.searchStarted && this.distance == undefined) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>



<style scoped>
.overlay-card {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 4;
  pointer-events: none;
}

.top-card {
  width: 100vw;
  min-height: 90px;
  z-index: 5;
  margin-bottom: 73vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.8);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  pointer-events: all;
}

.second_card {
  width: 100vw;
  height: 100vh;
  padding-top: 150px;
  position: fixed;
  bottom: 0;
  overflow: scroll;
  pointer-events: all;
}

.card-search-bar {
  width: 97vw;
}

.distance-card {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-left: 13px;
  margin-right: 13px;
  height: 47px;
}

.flex-box-item {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
}

.ma-2 {
  width: 33vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
}

.flex-box {
  display: flex;
  flex-wrap: wrap;
}

::-webkit-scrollbar {
  display: none;
}
</style>




