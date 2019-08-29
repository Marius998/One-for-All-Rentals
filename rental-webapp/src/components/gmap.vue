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
        @click="center=m.position"
        icon="https://img.icons8.com/officel/46/000000/scooter.png"
      />
    </GmapMap>
  </div>
</template>


<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
const fetch = require("node-fetch");


import * as fetchNextbike from '@/scripts/nextBike';

export default {
  name: "gmap",
  data() {
    return {
      markers: [],
      nextBikes : []
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
    
    addMarker : function(bikeList) {

        console.log("bikeList");
        console.log(bikeList);
        var bikecounter = 0;
        var i = 0;
        while(bikeList[i] != undefined) {
          const marker1 = {
          lat: bikeList[i][0],
          lng: bikeList[i][1]
          };
        
          this.markers.push({ position: marker1 });
          bikecounter++;
          i++;
        }
        console.log(bikecounter);
      }
  },

  beforeMount() {
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
    })
    .catch(function() {
        console.log("error");
    }); 

  },

  watch : {  
    nextBikes : function ()  {
       this.addMarker(this.nextBikes);
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
</style>


