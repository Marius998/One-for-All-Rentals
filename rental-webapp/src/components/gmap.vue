<template>
  <div>
    <app-route class="routeMenu" :userPos="userPosition" v-show="display_route"></app-route>

    <providerFilter v-show="display_filter" @provider="updateProvider"></providerFilter>

    <v-speed-dial
      v-show="!display_route"
      class="btn"
      v-model="fab"
      top
      right
      open-on-hover
      direction="bottom"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="white" fab dark>
          <v-icon color="black" v-if="fab">mdi-close</v-icon>
          <v-icon color="black" v-else>add</v-icon>
        </v-btn>
      </template>

      <v-btn fab dark small color="white" @click="panToCurrent">
        <v-icon color="black">location_searching</v-icon>
      </v-btn>

      <v-btn fab dark small color="white" @click="display_filter=!display_filter">
        <v-icon color="black">filter_list</v-icon>
      </v-btn>

      <v-btn fab dark small color="white" @click="display_route=!display_route">
        <v-icon color="black">attach_money</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-btn
      :class="{close_btn_pos1 : display_route, close_btn_pos2 : display_filter || display_infocard}"
      fab
      color="white"
      v-show="display_route || display_infocard || display_filter"
      @click="display_route=false; display_filter=false; display_infocard=false"
    >
      <v-icon color="black">close</v-icon>
    </v-btn>

    <GmapMap
      ref="mapRef"
      class="gmap"
      :center="{lat:50.946256, lng:6.897077}"
      :zoom="16"
      @click="display_infocard = false; display_filter = false; display_route = false"
      :class="{blurred : display_infocard || display_filter || display_route}"
      map-type-id="roadmap"
      :options="{
			gestureHandling : 'greedy',
			disableDefaultUI : true,
			styles: [
						{
              elementType: 'geometry',
              stylers: [{color: '#011b26'}]
              },
						{
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{color: '#021a26'},{lightness: -5},{visibility: 'on'}]
            },
						{
              elementType: 'labels.text.stroke',
              stylers: [{weight: 1.5}]
            },
						{
							featureType: 'administrative',
							elementType: 'geometry',
							stylers: [{color: '#757575'}]
						},
						{
							featureType: 'administrative.land_parcel',
							elementType: 'geometry',
							stylers: [{visibility: 'off'}]
						},
						{
							featureType: 'poi.park',
							elementType: 'geometry.fill',
							stylers: [{color: '#002226'}]
						},
						{
							featureType: 'road',
							elementType: 'geometry.fill',
							stylers: [{color: '#496773'}]
						},
						{
							featureType: 'transit',
							elementType: 'geometry.fill',
							stylers: [{color: '#2f4d59'}]
						},
						{
              featureType: 'transit.station.bus',
              elementType: 'labels.icon',
              stylers: [{saturation: -60},{visibility: 'on'}]
            },
						{
              featureType: 'transit.station.rail',
              elementType: 'labels.icon',
              stylers: [{saturation: -60},{visibility: 'on'}]
            },
						{
							featureType: 'water',
							elementType: 'geometry',
							stylers: [{color: '#01111e'}]
						}
					]
				}"
    >
      <GmapCluster
        zoomOnClick = true
        :maxZoom="14"
        :minimumClusterSize="4"
      >
        <!-- Nextbikes Marker -->
        <div v-if="showNextBike" class="showWrapper">
          <GmapMarker
            :key="index"
            v-for="(m, index) in nextBikes"
            :position="{lat : m.lat, lng : m.lng}"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="currentScooter = nextBikes[index]; display_infocard=!display_infocard; display_filter=false; display_route=false"
          />
        </div>

        <!-- Rhingo Marker -->
        <div v-if="showRhingo" class="showWrapper">
          <GmapMarker
            :key="index"
            v-for="(m, index) in rhingo"
            :position="{lat : m.lat, lng : m.lng}"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="currentScooter = rhingo[index]; display_infocard=!display_infocard; display_filter=false; display_route=false"
          />
        </div>

        <!-- Tier Marker -->
        <div v-if="showTier" class="showWrapper">
          <GmapMarker
            :key="index"
            v-for="(m, index) in tier"
            :position="{lat : m.lat, lng : m.lng}"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="currentScooter = tier[index]; display_infocard=!display_infocard; display_filter=false; display_route=false"
          />
        </div>

        <!-- Fordbike Marker -->
        <div v-if="showFordBike" class="showWrapper">
          <GmapMarker
            :key="index"
            v-for="(m, index) in fordBikes"
            :position="{lat : m.lat, lng : m.lng}"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="currentScooter = fordBikes[index]; display_infocard=!display_infocard"
          />
        </div>

        <!-- Lime Marker -->
        <div v-if="showLime" class="showWrapper">
          <GmapMarker
            :key="index"
            v-for="(m, index) in lime"
            :position="{lat : m.lat, lng : m.lng}"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="currentScooter = lime[index]; display_infocard=!display_infocard"
            repeat="20px"
          />
        </div>

        <!-- User Marker -->

        <GmapMarker
          titel="userPosition"
          :position="userPosition"
          :clickable="false"
          :draggable="false"
          watch="true"
          icon="https://img.icons8.com/color/48/000000/street-view.png"
        />
      </GmapCluster>
    </GmapMap>

    <InfoCard v-show="display_infocard" :scooter="currentScooter" />
  </div>
</template>


<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
Vue.component("GmapCluster", GmapCluster);

const fetch = require("node-fetch");

import InfoCard from "./infoCard";
import route from "./route";
import providerFilter from "./filter";

import * as fetchNextbike from "@/scripts/nextBike";
import * as fetchRhingo from "@/scripts/rhingo";
import * as fetchTier from "@/scripts/tier";

import * as fetchFordbike from "@/scripts/fordbike";
// import * as fetchFordbike from "@/scripts/fordbike";

import * as fetchLime from "@/scripts/lime";
import * as Storage from "@/scripts/Storage";

import { constants } from "crypto";

export default {
  name: "gmap",
  components: {
    "app-route": route,
    InfoCard,
    providerFilter
  },

  data() {
    return {
      display_route: false, //steuert das Anzeigen der route component

      fab: false, //kontroliert das Speed-dial Icon

      // speichert welche Anbieter ausgewählt wurden und als Marker dargestellt werden
      showNextBike: Boolean,
      showRhingo: Boolean,
      showTier: Boolean,
      showFordBike: Boolean,

      nextBikes: [], // speichert die nextBikes
      rhingo: [], // speichert die Rhingo Vehicle
      tier: [], // speichert die Tier Vehicle
      fordBikes: [], // speichert die Fordbikes

      showLime: Boolean,

      nextBikes: [], // speichert die nextBikes
      rhingo: [], // speichert die Rhingo Vehicle
      tier: [], // speichert die Tier Vehicle
      lime: [], // speichert die Lime Vehicle

      display_infocard: false, // entscheidet um die infoCard angezeigt werden soll
      display_filter: false,
      currentScooter: Object, // speichert das ausgewählte Vehicle für die infoCard

      // speichert die gewünschten Vehicle, welche als GmapMarker angezeigt werden | z.B nur Rhino oder im Radius 500m
      currentScooters: [],
      userPosition: {
        lat: 50.946256,
        lng: 6.897077
      }
    };
  },

  methods: {
    updateProvider() {
      console.log("update provider");

      this.showNextBike = localStorage.getItem("Nextbike") == "true";
      this.showFordBike = localStorage.getItem("Fordbike") == "true";
      this.showRhingo = localStorage.getItem("Rhingo") == "true";
      this.showTier = localStorage.getItem("Tier") == "true";
      this.showLime = localStorage.getItem("Lime") == "true";
    },

    panToCurrent() {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(this.userPosition);
      });
    },

    setMarkerPosition(position) {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    },

    addMarker: function(vehicleList) {
      console.log("vehicleList");
      console.log(vehicleList);

      var vehicleCounter = 0;

      while (vehicleList[vehicleCounter] != undefined) {
        const marker = {
          lat: vehicleList[vehicleCounter].lat,
          lng: vehicleList[vehicleCounter].lng
        };

        this.currentScooters.push({
          position: marker,
          icon: vehicleList[vehicleCounter].icon,
          vehicle: vehicleList[vehicleCounter],
          provider: vehicleList[vehicleCounter].provider
        });
        vehicleCounter++;
      }

      console.log(vehicleCounter);
    },

    removeMarker: function(provider) {
      console.log("remove Marker");
      this.currentScooters = this.currentScooters.filter(function(obj) {
        return obj.provider != provider;
      });
    }
  },

  created() {
    this.$nextTick(function() {
      let position = navigator.geolocation.watchPosition(
        position => {
          console.log("located");
          console.log(position);
          console.log("lat:", position.coords.latitude);
          console.log("lng:", position.coords.longitude);

          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        positionError => {
          console.log(positionError);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 15000
        }
      );

      navigator.geolocation.getCurrentPosition(position => {
        this.userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.panToCurrent();
      });
    });
  },

  mounted() {
    fetchNextbike
      .fetchNextbike()
      .then(bikes => {
        this.nextBikes = bikes;
      })
      .catch(function() {
        console.log("errorNextBike");
      }),
      fetchRhingo
        .fetchRhingo()
        .then(moped => {
          this.rhingo = moped;
        })
        .catch(function() {
          console.log("errorRhingo");
        }),
      fetchTier
        .fetchTier()
        .then(tierScooter => {
          this.tier = tierScooter;
        })
        .catch(function() {
          console.log("errorTier");
        }),
      fetchFordbike
        .fetchFordbike()
        .then(ford => {
          this.fordBikes = ford;
        })
        .catch(function() {
          console.log("errorFordbike");
        });

    fetchLime
      .fetchLime()
      .then(limeScooter => {
        this.lime = limeScooter;
      })
      .catch(function() {
        console.log("errorTier");
      });
  },

  computed: {}
};
</script>



<style scoped>
.gmap {
  width: 100vw;
  height: 100vh;
}

.blurred {
  filter: blur(6px);
}

.btn {
  z-index: 2;
  position: fixed;
  right: 5vw;
  top: 10vh;
}

.close_btn_pos1 {
  z-index: 100;
  position: fixed;
  bottom: 2vh;
  right: 5vw;
}

.close_btn_pos2 {
  z-index: 100;
  position: fixed;
  right: 5vw;
  top: 10vh;
}
</style>


