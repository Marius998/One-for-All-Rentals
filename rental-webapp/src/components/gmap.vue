<template>
  <div>
    <div class="geolocation-btn" @click="panToCurrent">
      <v-btn color="white" fab dark>
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
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon= m.icon
        @click="openInfoCard(index)"
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

import * as fetchNextbike from "@/scripts/nextBike";
import * as fetchRhingo from "@/scripts/rhingo";
import * as fetchTier from "@/scripts/tier";
import { constants } from "crypto";


export default {
  name: "gmap",
  components: {
    InfoCard
  },
  
  data() {
    return {
      markers: [],
      nextBikes: [],
      rhingo: [],
      tier: [],
      display: false,
      currentScooter : Object,
    };
  },
  
  methods: {
    panToCurrent() {
      console.log("panTOCUrrent");
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition(data => {
          console.log("located");
          console.log(data.coords.longitude);
          console.log(data.coords.latitude);
          let position = data;

          this.$refs.mapRef.$mapPromise.then(map => {
            map.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          });
        });
      }
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

        this.markers.push({ position: marker, icon : vehicleList[vehicleCounter].icon ,  vehicle : vehicleList[vehicleCounter]});
        vehicleCounter++;
        
      }

      console.log (vehicleCounter);
    },

    openInfoCard : function(key){
        console.log(key);
        this.display = !this.display;
        this.currentScooter = this.markers[key].vehicle;
        console.log(this.markers[key]);
    }
  },

  created() {
  
    this.$nextTick(function() {
      console.log("locating ...");
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition(data => {
          console.log("located");
          console.log(data.coords.longitude);
          console.log(data.coords.latitude);
          let position = data;

          this.$refs.mapRef.$mapPromise.then(map => {
            map.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          });
        });
      } else {
        console.log("No geolocation");
      }
    });
    
  },

  mounted() {

    fetchNextbike.fetchNextbike()
    .then( (bikes) =>{
      this.nextBikes = bikes;
    }).catch(function() {
        console.log("errorNextBike");
    }),
    
    fetchRhingo.fetchRhingo().then(moped => {
      this.rhingo = moped;
    }).catch(function() {
        console.log("errorRhingo");
    }),

    fetchTier.fetchTier().then(scooter => {
      this.rhingo = scooter;
    }).catch(function() {
        console.log("errorTier");
    })

  },

  watch : {  
    nextBikes : function ()  {
       this.addMarker(this.nextBikes);
    },
    rhingo: function() {
      this.addMarker(this.rhingo);
    },
    tier: function() {
      this.addMarker(this.tier);
    }

  }

};
</script>



<style scoped>
.gmap {
  width: 100vw;
  height: 100vh;
}

.geolocation-btn {
  z-index: 2;
  position: fixed;
  right: 50px;
  top: 100px;
}

.blurred {
  filter: blur(6px);
}

</style>


