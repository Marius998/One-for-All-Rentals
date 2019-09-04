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

    <div id="distance-chip" v-if="distanz">
      <v-chip class="ma-3" color="white" text-color="black" large>
        <v-icon left>navigation</v-icon>
        {{ distanz }} km
      </v-chip>
    </div>

    <v-card color="transparent" flat>
      <v-container class="pa-2" fluid>
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" class="flex-box">
            <v-card :color="item.color" dark>
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <v-list-item-title class="headline mb-2" v-text="item.provider"></v-list-item-title>

                  <v-list-item-subtitle v-text="item.type"></v-list-item-subtitle>

                  <div class="flex-box-item">
                    <v-chip class="ma-2" color="white" text-color="black">
                      <v-icon small left>query_builder</v-icon>
                      {{ item.duration}} Minuten
                    </v-chip>

                    <v-chip class="ma-2" color="white" text-color="black">
                      <v-icon small left>euro</v-icon>
                      {{ item.price }}
                    </v-chip>
                  </div>
                </v-list-item-content>

                <v-img :src="item.src" max-width="40vw"></v-img>
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

var lime = 0.2;
var tier = 0.15;
var rhingo = 0.23;
var nextbike = 1;

export default {
  data() {
    return {
      routeData: [],
      distanz: "",
      destination: "",
      start: "",
      userPosition: {
        lat: "",
        lng: ""
      },
      items: [
        {
          color: "#46DD00",
          src:
            "https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no",
          provider: "Lime",
          type: "E-Scooter",
          duration: "",
          price: "",
          distance: ""
        },
        {
          color: "#69D2AA",
          src:
            "https://lh3.googleusercontent.com/pIqWwk66A0zV6ibbFNCpI4bsrsuPnPYFOo2cQa-FEK4PE0BUF5Q5SNkxjxss5bp0rqdIg7M9Hq3fE3QcQaJoV1GUyezaTQgjlVBDVr80fSoiVjj5OURHVeYwyaBYUvXh_bMk7n7g63532xeLqNKjHX2Yr5K_B2Vu7_ngxfO54fll8kIWVA22RovKAycd7sJcUWklBSJHHJcEsogJqR3Hj35Rs5EKGMwY2gvllAWhsczudvuiRmsTB3KTFeDMcETxx3w9_S6Bb9RnHP-gGX1TFu8fLYPf-299T9_AYZDqd_BetXqnaguK55afE0F3zRj6dezMSFN8I9UAsMctUnOzJ3unmsmzMHQkfSpTJzsT9k1k7itCOJ1gck_5TfCuzxWpaaEXHmGHuAN5Z8-Z9P0l2M04oguodmM-5PNlLKaHfU0KK57m6ASCIc8Mh9fnLDsxXk9QW7KEgevZQnkLKiA0W2z1Grvhjd6C5fiN4J4vluONo3GfxQUg5dsGV5CUVrpmlQgkKGzrF-0IsQWQ7cPxMAb7enkm7sqbYEtG1E0tUDNDXSyvTQlpnzTQKt7YVbsqA-vc8H5tEhuQpEg86DuffeS-VCIykVsQ7XrptoIkrxReNdaTTVNE2N31piIWs8CMCRcVjgPd9l85yQlrBqbhC5B55sU3Nl3cnUPAjOoZ7y7LwQmFC9JhlA=w1280-h1253-no",
          provider: "Tier & Circ",
          type: "E-Scooter",
          duration: "",
          price: "",
          distance: ""
        },
        {
          color: "#194A97",
          src:
            "https://lh3.googleusercontent.com/s2kHd4YvwnnIG-scJcp8gmVJzRmMRB_bSkAiUfAlphtSJVnx2TdJRZoyLMq3QS7r7M4vGjn1kDETXFdio4IF05Di8bngwjVf7Ss_JF1O-d7FdScQd8w2fosyoIIpDGmvrFROVxdBSte0Ai_UztTIYhJx7dPcWOW-ZcUhm2GkmJ60Up237ngjmHxAVErM0gHTVjsvtdumFgJeBy1BYJnqTm96q0m9xGSCZ2NM1zQ5KaY9eMBWif6WlnpNpIhkLZxoyZD0uJ-ZoaKcIn3xhKg9VKALiRZ5p6ohbf5XUQyOhOYnY0th7mztJwclEMpgHOvrK8NstZIukDlDlsRyK_XP9Tu8QP_OzYclHSQywWqI1eaZhzvHWlHrxrucxoufWA5YwxMUoReHPs0npn_BYS8M3GLx3HVekqPS2beii16afz6-u7VnN87VRSatchXU7rRxmvMl8Xa7zbagO0lZZR20Xk6tKJestMt8DLySAvB-dVAxvjZ0JDw9BdzGQZckN_1fEscCLly2KQN4rrvVZe8hrdtr07mJZ4WTZUIrXa_1TI7H4EUimRVaFKWUFM5IBzM8rAtAdJoXZw-Nc0bhpQKtG5QbiWGWwFqorE0uEU1s-XqCqINpuIep3kscZ3RnFf1IoyfFxVuNOWiqtr3JfDYuVJjrgLkN9U5Fp138dSdF_73s6uH-5RcbiA=w1190-h770-no",
          provider: "nextbike",
          type: "Fahrrad",
          duration: "",
          price: "",
          distance: ""
        },
        {
          color: "#E30614",
          src:
            "https://lh3.googleusercontent.com/YCKOqHnqQrDq9gydSW2dDHiasP6UcZr00gi8AOEPU6p1KTqGtnKfAlZ0aISSk8YJzYwtwtiQjYHfJqZfRfN4M8zz0EV8dv_TmYkFn0lZ-QNs2tKD54Zt3CDeKGi4w89rmdOWvz24oXNFn3bbFwe2QWzPxBR4qKnXdJZo0xTeA_qD5g4BSZ8u0_8_Ef3TG_suxNkBlPADmvBqh48U1uvkxGO8DyQLiJQH76fRE6B8xOSu3lje23QhgguJqdZxChS0PCd44UPp1deJdbyNDMOyU3hlbp4YKEq-hzU1H7MONys9KG3670n3uJHnH7YH15x4DAqbcQ_dS8jB0SlC8mH_tR6RMmUZlK5JfQzPA1PIhwqkV8nD4okBXnctJwA28FG-KYnhzBvxfi2s5Iq9uPC7WSkSwfetYnj-Up6e27TEBLCDSg19ejzkPA8XIcwxWDIhZrAFlmHgp6ZQGQMxnQ580vzuqPsPskaeV_yMSxRXDC6iGeayKxA6OVg0PisJD5qKbCVr7zs9XpZx9-bg-UcuqUkp027y5oH3AUTrA5EMMWQ1n4XXP_YJ66SzaMqY4nKVXZgE17luFLuQhXpP384qVAa8_Pe5it7OCNZdsIFUJYIyfxQCUBUEjTlZL5X-arqD3TKgF2O8x9ZX1LaCkEHHo5Bebd1WN9IEmPsqVN1cZdnxKUrP9bZzKg=w705-h581-no",
          provider: "Rhingo",
          type: "Motorroller",
          duration: "",
          price: "",
          distance: ""
        }
      ]
    };
  },
  methods: {
    getRoute: function() {
      console.log("route wird berechnet");
      var key = "AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc";

      var apiBike =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        this.userPosition.lat +
        "," +
        this.userPosition.lng +
        "&destination=" +
        this.destination +
        "&mode=bicycling&key=" +
        key;
      var apiMoped =
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        this.userPosition.lat +
        "," +
        this.userPosition.lng +
        "&destination=" +
        this.destination +
        "&key=" +
        key;
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";

      var liste = [];
      var listeMoped = [];

      //  fetch e-scooter/bike
      return new Promise((resolve, reject) => {
        fetch(proxyUrl + apiBike)
          .then(res => res.json())
          .then(data => {
            var distance = data.routes[0].legs[0].distance.value;
            var duration = data.routes[0].legs[0].duration.value;

            liste.push(duration, distance);
          })
          .catch(function() {
            console.log("errorBikeFetch");
          });

        // fetch Moped
        fetch(proxyUrl + apiMoped)
          .then(res => res.json())
          .then(data => {
            var distanceMoped = data.routes[0].legs[0].distance.value;
            var durationMoped = data.routes[0].legs[0].duration.value;

            liste.push(durationMoped, distanceMoped);
          })
          .catch(function() {
            console.log("errorMopedFetch");
          });

        resolve(liste);
      })

        .then(data => {
          this.routeData = data;
        })
        .catch(function() {
          console.log("scheise");
        });
    },
    calculateLime: function(dauer, distanz) {
      dauer = dauer / 60;
      var roundDauer = Math.round(dauer * 1) / 1;
      distanz = distanz / 1000;
      var roundDistanz = Math.round(distanz * 100) / 100;
      console.log(" lime dauer" + dauer);
      var startgebühr = 1;
      var preis = dauer * lime + startgebühr;
      var roundPreis = Math.round(preis * 100) / 100;
      this.items[0].duration = roundDauer;
      this.items[0].price = roundPreis;
      this.items[0].distance = roundDistanz;
      this.distanz = roundDistanz;
      console.log(roundPreis);
    },
    calculateTierCirc: function(dauer, distanz) {
      dauer = dauer / 60;
      var roundDauer = Math.round(dauer * 1) / 1;
      distanz = distanz / 1000;
      var roundDistanz = Math.round(distanz * 100) / 100;
      console.log("tier dauer" + dauer);
      var startgebühr = 1;
      var preis = dauer * tier + startgebühr;
      var roundPreis = Math.round(preis * 100) / 100;
      this.items[1].duration = roundDauer;
      this.items[1].price = roundPreis;
      this.items[1].distance = roundDistanz;

      console.log(roundPreis);
    },
    calculateRhingo: function(dauer, distanz) {
      dauer = dauer / 60;
      var roundDauer = Math.round(dauer * 1) / 1;
      distanz = distanz / 1000;
      var roundDistanz = Math.round(distanz * 100) / 100;
      console.log(" rhingo dauer" + dauer);
      var preis = dauer * rhingo;
      var roundPreis = Math.round(preis * 100) / 100;
      this.items[3].duration = roundDauer;
      this.items[3].price = roundPreis;
      this.items[3].distance = roundDistanz;

      console.log(roundPreis);
    },
    calculateNextBike: function(dauer, distanz) {
      dauer = dauer / 60;
      var roundDauer = Math.round(dauer * 1) / 1;
      distanz = distanz / 1000;
      var roundDistanz = Math.round(distanz * 100) / 100;
      console.log(" nextbike dauer" + dauer);
      if (dauer >= 30) {
        var preis = nextbike * 2;
      } else {
        preis = nextbike;
      }
      this.items[2].duration = roundDauer;
      this.items[2].price = preis;
      this.items[2].distance = roundDistanz;

      console.log(preis);
    }
  },
  watch: {
    routeData: function() {
      this.calculateLime(this.routeData[0], this.routeData[1]);
      this.calculateTierCirc(this.routeData[0], this.routeData[1]);
      this.calculateNextBike(this.routeData[0], this.routeData[1]);
      this.calculateRhingo(this.routeData[2], this.routeData[3]);
    }
  },
  mounted() {
    let position = navigator.geolocation.getCurrentPosition(position => {
      console.log("lat:", position.coords.latitude);
      console.log("lng:", position.coords.longitude);

      this.userPosition.lat = position.coords.latitude;
      this.userPosition.lng = position.coords.longitude;
    });
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




