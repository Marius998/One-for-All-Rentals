<template>
  <div>
    <v-row justify="center">
      <radial-menu
        class="radial-menu"
        style="background-color: white"
        :itemSize="50"
        :radius="120"
        :angle-restriction="180"
      >
        <radial-menu-item>
          <!-- Ringo -->
          <img
            @click="showRhingo=!showRhingo"
            class="radialImg"
            v-bind:class="{ activeModul: showRhingo}"
            src="https://lh3.googleusercontent.com/g8npIP3QyCPMq4SN3cTXhnlRAg6F75qVFphxrosqmca372eTjFmPavfRCJDF6aMu9SdweC4B4EnK-CzCTYKicy-6Zfpq7ABognRKmC5UBqAOJdOOPzdN3h4iN_gfIB7Yiwm76DUWheMreKsjKOn7a8dWRf778HERlZ6BcDH4Gd2F2E3XJlB9ks2-X9KaB_-i7f77mFITWstUnydCx0awWLkphsSkmOi0IH9-4wwX4UVfTXBr5zMxBHm4vtKppBL6Rk6AeZ7OtJ_GNB4YWxpA2ePBaZP-hzCAm26BUxdDBBt5FAJ0Jf55QuRA8LQQPEgYXWA9_t19U6JarWcdOkywICbdEnLApYmK89GlVDwH6TpaRoGQhvbKow9_01lYQyEIkopkaLLBKA8kkSPdsStuMuYSIc3sPsPumcVIMHSGEX7ALZl1p5_CCZv3yFF6gW-BdXssg-WofEwHWla0aTRynoOmE9a58TpmfJMA19VISun5tFKVvd_C7QwRm6EHGt89g7vRUo8OSEJzBkJw7pvM5yVR8_gx_wueRchfDkCTnl_T2RGk4eAFuA2pBSjOrdlithjBSfWjkeYgY4UopccXI5Fmax-943a61F2FlNI_kYosEWzaoDg8Lkb_bsL9sOiKMAKxiTooV9QezFN4O9APxmocNfaQF5Gb19Xt502uZ9hV1NutvVJUPQ=s100-no"
            alt
            srcset
          />
        </radial-menu-item>

        <radial-menu-item>
          <!-- Tier -->
          <img
            @click="showTier=!showTier"
            class="radialImg"
            v-bind:class="{ activeModul: showTier}"
            src="https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no"
            alt
          />
        </radial-menu-item>

        <radial-menu-item>
          <!-- Nextbike -->
          <img
            @click="showNextBikes=!showNextBikes"
            class="radialImg"
            v-bind:class="{ activeModul: showNextBikes}"
            src="https://lh3.googleusercontent.com/YmXUsCJPHTC_SBZLVfnlVXNvoq4I-2_x6FN5hPa-l1et1cKW82wzGU7K6L6sAxWrt2J4X97B7Cvk7OKVxSv_-ahAygLqTeqgQqS7rFpAAi50Ab1JFkBcxBoV_Od29Dj9aBhlQQdXuenMYTpvKkbcorZAQeDhbAvU7B5q_21iKfzzaNgenhb-1i9dn3W56EG-r5anawdg4pyzJPHXFmOMZIb0zlxMhSfGxWE2-Ws0VwvNI1so2FJPhgfyQxMFWOeY_zEUc6KrEQkCkxNq-3qDtDNT7YrFaGQH5xCX8t22Z3aUpQWyesUyXJDIH_nbVvX49NGbmJ5OrJAEcDSu5YJb6zanQBdoQUquLNehgmRs7QJnkQAScy_f1mA1VPKSZjoU8YqJRVT6QQ6ynnIwOC8QWRQ1zchGrAvbI1FVpNfnCtaZ8T2Qh9nJoTiO4UAxAhwYAJRTBDJ8fvNPP2MOJJxE_OejHlBVIN0w3kwlpmKrOUFgcvPODUbwLSdx95zuwb9fK9nC60LlMs4Yu-FhQkdNmmi9P816QtM_FI7ZdlAOdCcgrGJzyX1cebXw1icebCL0YpB1gnqO2mqByLLEgUIJ2HCk7K3i2Bo6fE22-nny7byJR3mpBttpWbB7je5VqKxEtRNPDN8b31oPTjALkxMeOXZE6u5YfBM0hWNnZ2aCyTt8cHEXPup2wQ=s100-no"
            alt
          />
        </radial-menu-item>
      </radial-menu>
    </v-row>

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
      <GmapMarker
        :key="index"
        v-for="(m, index) in currentScooters"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="m.icon"
        @click="openInfoCard(index)"
      />
      <GmapMarker
        titel = 'userPosition'
        :position="userPosition"
        :clickable="false"
        :draggable="false"
        watch = true
        icon = 'https://img.icons8.com/color/48/000000/street-view.png'
      />
    </GmapMap>

    <InfoCard v-show="display" :scooter="currentScooter" />
  </div>
</template>


<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
const fetch = require("node-fetch");

import { RadialMenu, RadialMenuItem } from "vue-radial-menu";
import InfoCard from "./infoCard";

import * as fetchNextbike from "@/scripts/nextBike";
import * as fetchRhingo from "@/scripts/rhingo";
import * as fetchTier from "@/scripts/tier";
import { constants } from "crypto";

export default {
  name: "gmap",
  components: {
    InfoCard,
    RadialMenu,
    RadialMenuItem
  },

  data() {
    return {
      nextBikes: [], // speichert die next Bikes
      showNextBikes: true, // entscheidet ob next Bikes als Marker dargestellt werden sollen
      rhingo: [], // speichert die next Rhingo Vehicle
      showRhingo: true, // entscheidet ob Rhingo Vehicle als Marker dargestellt werden sollen
      tier: [], // speichert die next Tier Vehicle
      showTier: true, // entscheidet ob Tier Vehicle als Marker dargestellt werden sollen
      display: false, // entscheidet um die infoCard angezeigt werden soll
      currentScooter: Object, // speichert das ausgewählte Vehicle für die infoCard
      currentScooters: [], // speichert die gewünschten Vehicle, welche als GmapMarker angezeigt werden | z.B nur Rhino oder im Radius 500m
      userPosition: {
        lat: 0,
        lng: 0
      }
    };
  },

  methods: {
    panToCurrent() {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(this.userPosition);
      });
    },
    
    setMarkerPosition(position) {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
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
      this.currentScooter = this.currentScooters[key].vehicle;
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

      if (navigator.geolocation) {
        let position = navigator.geolocation.watchPosition(position => {
          
          console.log("located");
          console.log(position)
          console.log('lat:', position.coords.latitude);
          console.log('lng:', position.coords.longitude);

          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });

        this.panToCurrent();

      } else {
        console.log("No geolocation Support");
      }
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

  watch: {
    nextBikes: function() {
      if (this.showNextBikes) {
        this.addMarker(this.nextBikes);
      }
    },
    rhingo: function() {
      if (this.showRhingo) {
        this.addMarker(this.rhingo);
      }
    },
    tier: function() {
      if (this.showTier) {
        this.addMarker(this.tier);
      }
    },
    showNextBikes: function() {
      if (this.showNextBikes) {
        this.addMarker(this.nextBikes);
      } else {
        this.removeMarker("Nextbike");
      }
    },

    showRhingo: function() {
      if (this.showRhingo) {
        this.addMarker(this.rhingo);
      } else {
        this.removeMarker("Rhingo");
      }
    },

    showTier: function() {
      if (this.showTier) {
        this.addMarker(this.tier);
      } else {
        this.removeMarker("Tier");
      }
    }
  },

  computed: {}
};
</script>



<style scoped>
.gmap {
  width: 100vw;
  height: 100vh;
}

.radial-menu {
  z-index: 2;
  position: fixed;
  bottom: 50px;
}

.radialImg {
  width: 80px;
  border-radius: 80px;
}

.activeModul {
  border: 3.5px solid #3cd500;
  padding: 6px;
  border-radius: 80px;
}

.blurred {
  filter: blur(6px);
}

.geolocation-btn {
  z-index: 5;
  position: fixed;
  right: 7vw;
  top: 10vh;
}
</style>


