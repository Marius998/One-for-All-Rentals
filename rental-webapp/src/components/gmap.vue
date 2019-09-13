<template>
  <div>
    <app-route :userPos="userPosition"></app-route>

    <providerFilter @provider="updateProvider"></providerFilter>

    <div @click="panToCurrent">
      <v-btn color="white" class="geolocation-btn" fab dark>
        <v-icon color="black">location_searching</v-icon>
      </v-btn>
    </div>

    <GmapMap
      ref="mapRef"
      class="gmap"
      :center="{lat:50.946256, lng:6.897077}"
      :zoom="16"
      @click="display = false"
      :class="{blurred : display}"
      map-type-id="roadmap"
      :options="{
			gestureHandling : 'greedy',
			disableDefaultUI : true,
			styles: [
						{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
						{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
						{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
						{
							featureType: 'administrative.locality',
							elementType: 'labels.text.fill',
							stylers: [{color: '#d59563'}]
						},
						{
							featureType: 'poi',
							elementType: 'labels.text',
							stylers: [{visibility: 'off'}]
						},
						{
							featureType: 'poi',
							elementType: 'labels.icon',
							stylers: [{visibility: 'off'}]
						},
						{
							featureType: 'poi.park',
							elementType: 'geometry',
							stylers: [{color: '#315943'}]
						},
						{
							featureType: 'road',
							elementType: 'geometry',
							stylers: [{color: '#265c63'}]
						},
						{
							featureType: 'road',
							elementType: 'geometry.stroke',
							stylers: [{color: '#212a37'}]
						},
						{
							featureType: 'road',
							elementType: 'labels.text.fill',
							stylers: [{color: '#9ca5b3'}]
						},
						{
							featureType: 'road.highway',
							elementType: 'geometry',
							stylers: [{color: '#746855'}]
						},
						{
							featureType: 'road.highway',
							elementType: 'geometry.stroke',
							stylers: [{color: '#1f2835'}]
						},
						{
							featureType: 'road.highway',
							elementType: 'labels.icon',
							stylers: [{visibility: 'off'}]
						},
						{
							featureType: 'road.highway',
							elementType: 'labels.text.fill',
							stylers: [{visibility: 'off'}]
						},
						{
							featureType: 'transit',
							elementType: 'geometry',
							stylers: [{color: '#2f3948'}]
						},
						{
							featureType: 'transit.station',
							elementType: 'labels.text.fill',
							stylers: [{color: '#d59563'}]
						},
						{
							featureType: 'water',
							elementType: 'geometry',
							stylers: [{color: '#17263c'}]
						},
						{
							featureType: 'water',
							elementType: 'labels.text.fill',
							stylers: [{color: '#515c6d'}]
						},
						{
							featureType: 'water',
							elementType: 'labels.text.stroke',
							stylers: [{color: '#17263c'}]
						}
					]
				}"
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
          @click="currentScooter = nextBikes[index];display=!display"
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
          @click="currentScooter = rhingo[index];display=!display"
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
          @click="currentScooter = tier[index];display=!display"
        />
      </div>

      <GmapMarker
        titel="userPosition"
        :position="userPosition"
        :clickable="false"
        :draggable="false"
        watch="true"
        icon="https://img.icons8.com/color/48/000000/street-view.png"
      />
    </GmapMap>

    <InfoCard v-show="display" :scooter="currentScooter" />
  </div>
</template>


<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
const fetch = require("node-fetch");

import InfoCard from "./infoCard";
import route from "./route";
import providerFilter from "./filter";

import * as fetchNextbike from "@/scripts/nextBike";
import * as fetchRhingo from "@/scripts/rhingo";
import * as fetchTier from "@/scripts/tier";
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
      // speichert welche Anbieter ausgewählt wurden und als Marker dargestellt werden

      showNextBike: Boolean,
      showRhingo: Boolean,
      showTier: Boolean,
      nextBikes: [], // speichert die nextBikes
      rhingo: [], // speichert die Rhingo Vehicle
      tier: [], // speichert die Tier Vehicle

      display: false, // entscheidet um die infoCard angezeigt werden soll
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
    updateProvider(e) {
      this.showNextBike = e[0];
      this.showRhingo = e[1];
      this.showTier = e[2];
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

    openInfoCard: function(key) {
      console.log(key);
      this.display = !this.display;
      this.currentScooter = this.currentScooters[key];
      console.log(this.currentScooters[key]);
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
      console.log("locating ...");

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

          this.panToCurrent();
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

.geolocation-btn {
  z-index: 3;
  position: fixed;
  right: 7vw;
  top: 20vh;
}
</style>


