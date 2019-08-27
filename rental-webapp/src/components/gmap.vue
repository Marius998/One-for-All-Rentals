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
      disableDefaultUI : true
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
              }
              else {
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


