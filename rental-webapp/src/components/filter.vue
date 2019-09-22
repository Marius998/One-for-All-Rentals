<template>
  <div>
      <v-card class="card" width="100vw" height="60vh">
        <v-toolbar flat color="transparent">
          <v-toolbar-title>Filter</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-container class="container">
          <v-row align="center" justify="start">
            <ul v-for="(selection, i) in selections" :key="selection.text">
              <v-chip
                class="chip"
                @click:close="selected.splice(i, 1)"
                :color="selection.color"
                pill
                close
              >
                <v-avatar left>
                  <v-img :src="selection.avatar"></v-img>
                </v-avatar>

                <span>{{selection.text}}</span>
              </v-chip>
            </ul>
          </v-row>
        </v-container>

        <v-divider v-if="!allSelected"></v-divider>

        <v-list>
          <v-list-group prepend-icon="mdi-bike" :value="false" v-if="showBikeGroup">
            <template v-slot:activator>
              <v-list-item-title>Fahrräder</v-list-item-title>
            </template>

            <ul v-for="(item, i) in items" :key="i">
              <template v-if="item.bike">
                <v-list-item
                  v-if="!selected.includes(i)"
                  @click="selected.push(i)"
                  color="black"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon right>add</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </template>
            </ul>
          </v-list-group>

          <v-list-group prepend-icon="battery_charging_full" :value="false" v-if="showMotorizedGroup">
            <template v-slot:activator>
              <v-list-item-title>Motorisierte Fahrzeuge</v-list-item-title>
            </template>

            <ul v-for="(item, i) in items" :key="i">
              <template v-if="!item.bike">
                <v-list-item
                  v-if="!selected.includes(i)"
                  @click="selected.push(i)"
                  color="black"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar" ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-icon right>add</v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </template>
            </ul>
          </v-list-group>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            :disabled="!selected.length"
            :loading="loading_deselect"
            color="purple"
            text
            @click="selectNone"
          >Auswahl aufheben</v-btn>
        </v-card-actions>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            :disabled="allSelected"
            :loading="loading"
            color="purple"
            text
            @click="selectAll"
          >Alle Auswählen</v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import { nextTick } from 'q';
export default {
  data: () => ({
    //Reihenfolge in Items darf nicht geändert werden!!!
    items: [
      {
        text: "Nextbike",
        color: "#194A97",
        bike: true,
        avatar:
          "https://lh3.googleusercontent.com/YmXUsCJPHTC_SBZLVfnlVXNvoq4I-2_x6FN5hPa-l1et1cKW82wzGU7K6L6sAxWrt2J4X97B7Cvk7OKVxSv_-ahAygLqTeqgQqS7rFpAAi50Ab1JFkBcxBoV_Od29Dj9aBhlQQdXuenMYTpvKkbcorZAQeDhbAvU7B5q_21iKfzzaNgenhb-1i9dn3W56EG-r5anawdg4pyzJPHXFmOMZIb0zlxMhSfGxWE2-Ws0VwvNI1so2FJPhgfyQxMFWOeY_zEUc6KrEQkCkxNq-3qDtDNT7YrFaGQH5xCX8t22Z3aUpQWyesUyXJDIH_nbVvX49NGbmJ5OrJAEcDSu5YJb6zanQBdoQUquLNehgmRs7QJnkQAScy_f1mA1VPKSZjoU8YqJRVT6QQ6ynnIwOC8QWRQ1zchGrAvbI1FVpNfnCtaZ8T2Qh9nJoTiO4UAxAhwYAJRTBDJ8fvNPP2MOJJxE_OejHlBVIN0w3kwlpmKrOUFgcvPODUbwLSdx95zuwb9fK9nC60LlMs4Yu-FhQkdNmmi9P816QtM_FI7ZdlAOdCcgrGJzyX1cebXw1icebCL0YpB1gnqO2mqByLLEgUIJ2HCk7K3i2Bo6fE22-nny7byJR3mpBttpWbB7je5VqKxEtRNPDN8b31oPTjALkxMeOXZE6u5YfBM0hWNnZ2aCyTt8cHEXPup2wQ=s100-no"
      },
      {
        text: "Fordbike",
        color: "#EC1614",
        bike: true,
        avatar:
          "https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no"
      },
      {
        text: "Rhingo",
        color: "#E30614",
        bike: false,
        avatar:
          "https://lh3.googleusercontent.com/g8npIP3QyCPMq4SN3cTXhnlRAg6F75qVFphxrosqmca372eTjFmPavfRCJDF6aMu9SdweC4B4EnK-CzCTYKicy-6Zfpq7ABognRKmC5UBqAOJdOOPzdN3h4iN_gfIB7Yiwm76DUWheMreKsjKOn7a8dWRf778HERlZ6BcDH4Gd2F2E3XJlB9ks2-X9KaB_-i7f77mFITWstUnydCx0awWLkphsSkmOi0IH9-4wwX4UVfTXBr5zMxBHm4vtKppBL6Rk6AeZ7OtJ_GNB4YWxpA2ePBaZP-hzCAm26BUxdDBBt5FAJ0Jf55QuRA8LQQPEgYXWA9_t19U6JarWcdOkywICbdEnLApYmK89GlVDwH6TpaRoGQhvbKow9_01lYQyEIkopkaLLBKA8kkSPdsStuMuYSIc3sPsPumcVIMHSGEX7ALZl1p5_CCZv3yFF6gW-BdXssg-WofEwHWla0aTRynoOmE9a58TpmfJMA19VISun5tFKVvd_C7QwRm6EHGt89g7vRUo8OSEJzBkJw7pvM5yVR8_gx_wueRchfDkCTnl_T2RGk4eAFuA2pBSjOrdlithjBSfWjkeYgY4UopccXI5Fmax-943a61F2FlNI_kYosEWzaoDg8Lkb_bsL9sOiKMAKxiTooV9QezFN4O9APxmocNfaQF5Gb19Xt502uZ9hV1NutvVJUPQ=s100-no"
      },
      {
        text: "Tier",
        color: "#69D2AA",
        bike: false,
        avatar:
          "https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no"
      },
      {
        text: "Lime",
        color: "#46DD00",
        bike: false,
        avatar:
          "https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no"
      }
    ],
    loading: false,
    loading_deselect: false,
    selected: [0,2,3]      
  }),

  props : ['showNextBikes','showRhingo','showTier','showLime'],
  
  methods: {
    sendData: function() {
      this.$emit("provider", [
        this.showNextBikes,
        this.showRhingo,
        this.showTier,
        this.showLime
      ]);
    },

    selectNone() {
      this.loading_deselect = true;

      setTimeout(() => {
        this.selected = [];
        this.loading_deselect = false;
      }, 200);
    },

    selectAll() {
      this.loading = true;

      setTimeout(() => {
        this.selected = [0,1,2,3,4];
        this.loading = false;
      }, 200);
    }
  },

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },

    // Entscheidet, ob die v-list-group Motorisierte Fahrzeuge angezeigt wird
    showMotorizedGroup() {
      return !this.selected.includes(2) || !this.selected.includes(3) || !this.selected.includes(4);
    },

    // Entscheidet, ob die v-list-group Fahrräder angezeigt wird
    showBikeGroup() {
      return !this.selected.includes(0) || !this.selected.includes(1);
    },

    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(this.items[selection]);
      }

      return selections;
    }
  },

  watch: {
    selected: function reloadProvider(){

      this.showNextBikes = this.selected.includes(0);
      this.showRhingo = this.selected.includes(2);
      this.showTier = this.selected.includes(3);

      this.sendData();
    }
  }
};
</script>

<style scoped>
.chip{
  color: white;
  margin-bottom: 10px;
  margin-right: 0px;
  margin-left: 0px;
}

.container{
  padding: 0;
  padding-right: 17px;
}

.card {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.8);
  z-index: 5;
}

</style>