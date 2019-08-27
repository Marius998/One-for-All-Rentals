<template>
  <div>
    <v-btn class="geolocation-btn" rounded @click="panToCurrent"> <v-icon>location_searching</v-icon> </v-btn>
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
        :draggable="true"
        @click="center=m.position"
      />

    
    </GmapMap>

    
  </div>
</template>


<script>
var markers = [];
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  name : 'gmap',
  data: () => ({
    markers : markers, 
  }),
  computed : {

  },
  methods : {
    panToCurrent ()  {
      console.log("panTOCUrrent");
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition((data)=>{
          console.log("located");
          console.log(data.coords.longitude);
          console.log(data.coords.latitude);
          let position = data;
          
          this.$refs.mapRef.$mapPromise.then((map) => {
            map.panTo({lat : position.coords.latitude , lng: position.coords.longitude})
          })
        });              
      }
    }
  },

  mounted: function () {
    
    this.$nextTick(function () {
      
      console.log("locating ...");
      if (navigator.geolocation) {
        let position = navigator.geolocation.getCurrentPosition((data)=>{
          console.log("located");
          console.log(data.coords.longitude);
          console.log(data.coords.latitude);
          let position = data;
          
          this.$refs.mapRef.$mapPromise.then((map) => {
            map.panTo({lat : position.coords.latitude , lng: position.coords.longitude})
          })
        });              
      } else {
        console.log("No geolocation");
      }
    })
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
  margin-top: 5vh;
  margin-left: 80vw;
}
</style>


