<template>
  <div>
    <div class="flex-box-input">
      <v-text-field
        class="inputDestination"
        v-model="destination"
        solo
        label="Ziel eingeben ..."
        clearable
        append-icon="directions"
      ></v-text-field>

      <v-btn id="searchBtn" large v-on:click="getRoute">route berechnen</v-btn>
    </div>

    <div id="distance-chip" v-if="distance">
      <v-chip class="ma-3" color="white" text-color="black" large>
        <v-icon left>navigation</v-icon>
        {{ distance }} km
      </v-chip>
    </div>

    <v-card color="transparent" flat v-if="distance">
      <v-container class="pa-2" fluid>
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
    </v-card>
  </div>
</template>


<script>
import { constants } from "crypto";

export default {

  props: ['userPos', 'choosenProvider'],

  data() {
    return {
      routeData: {
        bikeDistance: undefined,
        bikeDuration: undefined,
        moppedDistance: undefined,
        moppedDuration: undefined
      },
      distance: undefined,

      destination: undefined,
      origin: this.userPos.lat + ',' + this.userPos.lng,

      provider: [
        {
          name: "Lime",
          choosen: true,
          pricePerMinute: true,
          pricePerUnit: 0.2,
          startPrice: 1,
          bikeRoute: true,
          color: "#46DD00",
          src: "https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no",
          type: "E-Scooter",
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
          src: "https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no",
          type: "E-Scooter",
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
          src: "https://lh3.googleusercontent.com/s2kHd4YvwnnIG-scJcp8gmVJzRmMRB_bSkAiUfAlphtSJVnx2TdJRZoyLMq3QS7r7M4vGjn1kDETXFdio4IF05Di8bngwjVf7Ss_JF1O-d7FdScQd8w2fosyoIIpDGmvrFROVxdBSte0Ai_UztTIYhJx7dPcWOW-ZcUhm2GkmJ60Up237ngjmHxAVErM0gHTVjsvtdumFgJeBy1BYJnqTm96q0m9xGSCZ2NM1zQ5KaY9eMBWif6WlnpNpIhkLZxoyZD0uJ-ZoaKcIn3xhKg9VKALiRZ5p6ohbf5XUQyOhOYnY0th7mztJwclEMpgHOvrK8NstZIukDlDlsRyK_XP9Tu8QP_OzYclHSQywWqI1eaZhzvHWlHrxrucxoufWA5YwxMUoReHPs0npn_BYS8M3GLx3HVekqPS2beii16afz6-u7VnN87VRSatchXU7rRxmvMl8Xa7zbagO0lZZR20Xk6tKJestMt8DLySAvB-dVAxvjZ0JDw9BdzGQZckN_1fEscCLly2KQN4rrvVZe8hrdtr07mJZ4WTZUIrXa_1TI7H4EUimRVaFKWUFM5IBzM8rAtAdJoXZw-Nc0bhpQKtG5QbiWGWwFqorE0uEU1s-XqCqINpuIep3kscZ3RnFf1IoyfFxVuNOWiqtr3JfDYuVJjrgLkN9U5Fp138dSdF_73s6uH-5RcbiA=w1190-h770-no",
          type: "Fahrrad",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        },
        {
          name: "Rhingo",
          pricePerMinute: true,
          pricePerUnit: 0.23,
          startPrice: 0,
          bikeRoute: false,
          choosen: true,
          color: "#E30614",
          src: "https://lh3.googleusercontent.com/YCKOqHnqQrDq9gydSW2dDHiasP6UcZr00gi8AOEPU6p1KTqGtnKfAlZ0aISSk8YJzYwtwtiQjYHfJqZfRfN4M8zz0EV8dv_TmYkFn0lZ-QNs2tKD54Zt3CDeKGi4w89rmdOWvz24oXNFn3bbFwe2QWzPxBR4qKnXdJZo0xTeA_qD5g4BSZ8u0_8_Ef3TG_suxNkBlPADmvBqh48U1uvkxGO8DyQLiJQH76fRE6B8xOSu3lje23QhgguJqdZxChS0PCd44UPp1deJdbyNDMOyU3hlbp4YKEq-hzU1H7MONys9KG3670n3uJHnH7YH15x4DAqbcQ_dS8jB0SlC8mH_tR6RMmUZlK5JfQzPA1PIhwqkV8nD4okBXnctJwA28FG-KYnhzBvxfi2s5Iq9uPC7WSkSwfetYnj-Up6e27TEBLCDSg19ejzkPA8XIcwxWDIhZrAFlmHgp6ZQGQMxnQ580vzuqPsPskaeV_yMSxRXDC6iGeayKxA6OVg0PisJD5qKbCVr7zs9XpZx9-bg-UcuqUkp027y5oH3AUTrA5EMMWQ1n4XXP_YJ66SzaMqY4nKVXZgE17luFLuQhXpP384qVAa8_Pe5it7OCNZdsIFUJYIyfxQCUBUEjTlZL5X-arqD3TKgF2O8x9ZX1LaCkEHHo5Bebd1WN9IEmPsqVN1cZdnxKUrP9bZzKg=w705-h581-no",
          type: "Motorroller",
          duration: undefined,
          priceCurrentRide: undefined,
          distance: undefined
        }
      ]
    };
  },

  methods: {

    getBikeRoute(){

      var key = "AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc";
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";

      var apiBike =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        this.origin +
        "&destination=" +
        this.destination +
        "&mode=bicycling&key=" +
        key;

      return fetch(proxyUrl + apiBike)
        .then(res => res.json())
        .then(data => {
          console.log('bikeFetched');
          this.routeData.bikeDistance = data.routes[0].legs[0].distance.value;
          this.routeData.bikeDuration = data.routes[0].legs[0].duration.value;
        })
        .catch(function() {
          console.log("errorBikeFetch");
        });
    },

    getMoppedRoute(){

      var key = "AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc";
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";

      var apiMoped =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        this.origin +
        "&destination=" +
        this.destination +
        "&mode=driving&avoid=highways&key=" +
        key;

      return fetch(proxyUrl + apiMoped)
        .then(res => res.json())
        .then(data => {
          console.log('moppedFetched');
          this.routeData.moppedDistance = data.routes[0].legs[0].distance.value;
          this.routeData.moppedDuration = data.routes[0].legs[0].duration.value;
        })
        .catch(function() {
          console.log("errorMopedFetch");
        });
    },

    getRoutes(){
      return Promise.all([this.getBikeRoute(), this.getMoppedRoute()])
    },

    getRoute: function() {
      console.log("Route wird berechnet...");

      this.getRoutes()
        .then(([bikes, moppeds]) => {
          this.calculatePrice();
      })
      
    },

    calculatePrice(){

      this.provider.forEach(provider => {

        if(provider.bikeRoute){
          provider.distance = Math.round(this.routeData.bikeDistance/1000);
          this.distance = provider.distance;
          provider.duration = Math.round(this.routeData.bikeDuration/60);
        }
        else{
          provider.distance = Math.round(this.routeData.moppedDistance/1000);
          provider.duration = Math.round(this.routeData.moppedDuration/60);
        }

        if(provider.pricePerMinute) {
          provider.priceCurrentRide = Math.round((provider.startPrice + provider.pricePerUnit * provider.duration) * 100)/100;
        }
        else{
          provider.priceCurrentRide = provider.startPrice + Math.ceil(provider.pricePerUnit * provider.duration/30);
        }
      })

    },

  }

};
</script>



<style scoped>
.inputDestination {
  max-width: 85%;
}

.flex-box-input {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 3vh;
}

.flex-box-item {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2vh;
}

#searchBtn {
  width: 85%;
}

#distance-chip {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.ma-3 {
  width: 40vw;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
}

.pa-2 {
  margin-top: 1vh;
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
</style>




