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
        :draggable="true"
        @click="center=m.position"
        icon="https://img.icons8.com/officel/46/000000/scooter.png"
      />
    </GmapMap>
  </div>
</template>


<script>
// icon= "https://store-images.s-microsoft.com/image/apps.58743.9007199266343078.3ba0f22e-dc41-4cec-9c9c-cb807ffdb230.06103844-c1ce-454e-bb62-be27206c7a65?mode=scale&q=90&h=70&w=70"
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
const fetch = require("node-fetch");

var cityID = 14;
var api = "https://api.nextbike.net/maps/nextbike-live.json?city=" + cityID;

export default {
  name: "gmap",
  data() {
    return {
      markers: []
    };
  },
  computed: {},
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
    getData: async function() {
      var liste = [];

      var addMarker = (list = []) => {
        console.log("klappt");

        const marker1 = {
          lat: 50.941278,
          lng: 6.958281
        };
        const marker2 = {
          lat: list[2],
          lng: list[3]
        };
        const marker3 = {
          lat: list[0],
          lng: list[1]
        };
        this.markers.push({ position: marker1 });
        this.markers.push({ position: marker2 });
        this.markers.push({ position: marker3 });
      };

      fetch(api)
        .then(res => res.json())
        .then(json => {
          json.countries.forEach(country => {
            country.cities.forEach(city => {
              city.places.forEach(place => {
                if (place.uid < 3176060) liste.push(place.lat, place.lng);
              });
            });
          });

          // var lat = json.countries[0].cities[0].places[100].lat;
          // var lng = json.countries[0].cities[0].places[100].lng;

          addMarker(liste);
        });
    }
  },
  beforeMount() {
    this.getData();
  },

  mounted: function() {
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


