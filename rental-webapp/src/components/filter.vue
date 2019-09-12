<template>
  <div>
    <v-btn color="white" class="showTextField" fab @click="overlay = !overlay">
      <v-icon color="black">filter</v-icon>
    </v-btn>

    <v-overlay :absolute="absolute" :value="overlay">
      <v-card class="mx-auto" width="100vw" height="55vh" color="white">
        <v-card-text>
          <h1 class="display-1 black--text">Filter</h1>

          <div class="first-flex-box">
            <v-chip
              class="first-chip"
              outlined
              color="red"
              @click="showTier= true; showNextBikes = true; showRhingo = true; sendData()"
            >
              <v-icon left color="red">search</v-icon>Alle anzeigen
            </v-chip>

            <v-chip
              class="first-chip"
              outlined
              color="red"
              @click="showTier= false; showNextBikes = false; showRhingo = false; sendData()"
            >
              <v-icon left color="red">search</v-icon>Keine anzeigen
            </v-chip>
          </div>

          <h1 class="headline black--text">Fahrzeug auswählen</h1>

          <div class="first-flex-box">
            <v-chip
              class="first-chip"
              outlined
              color="red"
              @click="showTier= false; showNextBikes = true; showRhingo = false; sendData()"
            >
              <v-icon left color="red">directions_bike</v-icon>Fahrrad
            </v-chip>

            <v-chip
              class="first-chip"
              outlined
              color="red"
              @click="showTier= true; showNextBikes = false; showRhingo = true; sendData()"
            >
              <v-icon left color="red">airport_shuttle</v-icon>Scooter
            </v-chip>
          </div>

          <h1 class="headline black--text">Anbieter auswählen</h1>

          <v-chip-group column multiple>
            <v-chip
              class="provider-chip"
              @click="showTier=!showTier; sendData()"
              color="#69D2AA"
              filter
              pill
            >
              <span>Tier</span>

              <v-avatar right>
                <v-img
                  src="https://lh3.googleusercontent.com/FRm5mDsAk822-3Zmi-NmG_shq0jyiaqgh81gNEjsoy7nrC6ZmevioEtWSqN4Ca8Vqnpp8XhOcJmp9mp7Z66AUpLP6lWAr-4m2Si8hQHmmCzTcfGl_be61n5iWdzNjdHjGbgjryrgnyOYwK3IRLhlOmE4wdAKq0bu4gvDMuzcw_QHiZwCEFWHyALS07tUTQQ6oQUzXy3bAFPwjoGPscoDZKqD7ej7KViMJqBy0CqdlkQKZp-5KJtBR_Y8KOXO8I4brj3jbfIBp2PHjnUsdvEeVMMkOpJaP8576Ceahiatr6-jIlvRfRNfrKUuav3WlzlPkMmhk0GcWQFkul0AoatC48sGC6idSmFvtpVnUMUPnj_8xlSQWD3ZVXnGysbjOviqZP3edNc30df7F4guU-mZYEeJW4HTJ7G47S9bASbUN9Qii23ZOEYlvgizrBn7XLuxImX0ozV5hbea7pABAehxdcArixaUqfp0hYQr5D5PI3WOJmzDVuJIc6HJ1EfmqZ4T-0q5W8omQMYgoADlSvp9xMuyA2mAWb1S8V8jAYsay0blPQTNDZ9E_-F9WO6ad0DC7aK7caG5Ue_ilrYpM9n1tAKO6knxarXK07sy8fvn4kfShQrLllEAOObudFJe_rVUBY9LGHDQlD9FoU8a9c_Iuvk9JkZRXMmBxGf7Ae51Ejj6CNYVFEvEeg=s492-no"
                ></v-img>
              </v-avatar>
            </v-chip>

            <v-chip
              class="provider-chip"
              @click="showNextBikes=!showNextBikes; sendData()"
              color="#194A97"
              filter
              pill
            >
              <span>Nextbike</span>

              <v-avatar right>
                <v-img
                  src="https://lh3.googleusercontent.com/YmXUsCJPHTC_SBZLVfnlVXNvoq4I-2_x6FN5hPa-l1et1cKW82wzGU7K6L6sAxWrt2J4X97B7Cvk7OKVxSv_-ahAygLqTeqgQqS7rFpAAi50Ab1JFkBcxBoV_Od29Dj9aBhlQQdXuenMYTpvKkbcorZAQeDhbAvU7B5q_21iKfzzaNgenhb-1i9dn3W56EG-r5anawdg4pyzJPHXFmOMZIb0zlxMhSfGxWE2-Ws0VwvNI1so2FJPhgfyQxMFWOeY_zEUc6KrEQkCkxNq-3qDtDNT7YrFaGQH5xCX8t22Z3aUpQWyesUyXJDIH_nbVvX49NGbmJ5OrJAEcDSu5YJb6zanQBdoQUquLNehgmRs7QJnkQAScy_f1mA1VPKSZjoU8YqJRVT6QQ6ynnIwOC8QWRQ1zchGrAvbI1FVpNfnCtaZ8T2Qh9nJoTiO4UAxAhwYAJRTBDJ8fvNPP2MOJJxE_OejHlBVIN0w3kwlpmKrOUFgcvPODUbwLSdx95zuwb9fK9nC60LlMs4Yu-FhQkdNmmi9P816QtM_FI7ZdlAOdCcgrGJzyX1cebXw1icebCL0YpB1gnqO2mqByLLEgUIJ2HCk7K3i2Bo6fE22-nny7byJR3mpBttpWbB7je5VqKxEtRNPDN8b31oPTjALkxMeOXZE6u5YfBM0hWNnZ2aCyTt8cHEXPup2wQ=s100-no"
                ></v-img>
              </v-avatar>
            </v-chip>

            <v-chip
              class="provider-chip"
              @click="showRhingo=!showRhingo; sendData()"
              color="#E30614"
              filter
              pill
            >
              <span>Rhingo</span>

              <v-avatar right>
                <v-img
                  src="https://lh3.googleusercontent.com/g8npIP3QyCPMq4SN3cTXhnlRAg6F75qVFphxrosqmca372eTjFmPavfRCJDF6aMu9SdweC4B4EnK-CzCTYKicy-6Zfpq7ABognRKmC5UBqAOJdOOPzdN3h4iN_gfIB7Yiwm76DUWheMreKsjKOn7a8dWRf778HERlZ6BcDH4Gd2F2E3XJlB9ks2-X9KaB_-i7f77mFITWstUnydCx0awWLkphsSkmOi0IH9-4wwX4UVfTXBr5zMxBHm4vtKppBL6Rk6AeZ7OtJ_GNB4YWxpA2ePBaZP-hzCAm26BUxdDBBt5FAJ0Jf55QuRA8LQQPEgYXWA9_t19U6JarWcdOkywICbdEnLApYmK89GlVDwH6TpaRoGQhvbKow9_01lYQyEIkopkaLLBKA8kkSPdsStuMuYSIc3sPsPumcVIMHSGEX7ALZl1p5_CCZv3yFF6gW-BdXssg-WofEwHWla0aTRynoOmE9a58TpmfJMA19VISun5tFKVvd_C7QwRm6EHGt89g7vRUo8OSEJzBkJw7pvM5yVR8_gx_wueRchfDkCTnl_T2RGk4eAFuA2pBSjOrdlithjBSfWjkeYgY4UopccXI5Fmax-943a61F2FlNI_kYosEWzaoDg8Lkb_bsL9sOiKMAKxiTooV9QezFN4O9APxmocNfaQF5Gb19Xt502uZ9hV1NutvVJUPQ=s100-no"
                ></v-img>
              </v-avatar>
            </v-chip>

            <v-chip class="provider-chip" color="#46DD00" filter pill>
              <span>Lime</span>

              <v-avatar right>
                <v-img
                  src="https://lh3.googleusercontent.com/-vjCmgrmZOXLUQkvrO97Nv89_FESwXEuMHIy29CkC9CZplei4lXaFADv-bbGTIZiaqtdgbTD3wHECuTZFDjcWDWF064RNp52BHLLeJVhcgqZqXLjafldwNnlZMyTDoMc9jTMHDDaElGMFqRmZ0LGnArFVInnGRcmDcXRAmpbfE0yeNvd_G3EonmteKK2gWSVk3ZkjnZVOEOiBSciWqa3hyAcMWXEBwJT0EZ_AN7BJLsCD9_iEHQDQmDD4jZuF7Tt5FOI_PQ1Qzd8mlxV5C1NErktBpWCFpiR-KSYj1i8IuJNKEoV4TwpdGlqSTqUXzuOwQo1oRtQJA6-k985VWPPMEr3vSigFbUl-XGmz8wKcHvWARtPjS7g33PjZLeoObMFg59DkOLgBgOROAvCyCRmiKTs5OVU5Xg6Sy4JpMX9fSclV0mLGMs809BvXd5UGMx3UfOKFNkkI2Z1siIbdsVPX932Q0Pt2MuaGNFI6RTENZt5SFL7sPfilai8GOObJ-UwAbCEcRLEGNZYilfQ5jBGaRP4hLtMzkqVoB0XPABoE2Jv2D_oyyvqZKPjP_Fb837fIopgeF2NivNpg7HQKNY09m7BZoWmKwaL_Pava0RnYJvaXrgBIHooywaePeg24uDDHmnDzEV7JwFWoqLjNWNfWY_lYYcvCxs8wb-eWl9Lpoq3GTRcn_oxPg=s452-no"
                ></v-img>
              </v-avatar>
            </v-chip>

            <v-chip class="provider-chip" color="#EC1614" filter pill>
              <span>Fordbike</span>

              <v-avatar right>
                <v-img
                  src="https://lh3.googleusercontent.com/jRkDzgInXzVONlijlZz9raL9VJijqBoiHOId7ukb_sIGBqvs2kc_UmIsTCtysxRIHku86MK4CQXG6ayjBCPfIxzq6cOcfbq9txUY3Do3CxeGIN8qhVRkXQs-LnaZqqtE2iEZ3izEJBx4OwlorbMNm8iK_H1Yhs_tL3bhkm28kQ0TnUEByj2IIMCfBd1KZrvQJdMPvCiaQBKULgzxkVvZhkXtOWM8g91Bur9cIrO18VnM9pqmLresRi_MEWkdrAHEPbB1W0LnOAo2czWP2k3CPVK7LhjGiECD6flq2eVOsp6sjbxo-b7wjp-ofVvx1NFoBM5eq1jc-FffU7L2eqS-EyVWS-Y4fxCOyZ6kr0rAH_ACDwxGU_xbaItXYr4Tb7PGIDDEm6H9QcO4TKxaAazBOVrfpOfGwuojhb579vmu1Q1gDehQw2yVXlX17gmqWFBtu65yvH06G699_x4FVEu72HzFlAXQ9Jbpc0iVA4a4Js0DVztaIfqtvE3d5T7dDhQdZekVRGmtZ2UzuIZ96Rs-HotDL4qY56PwwORrVS4fYwHilM3EJBZFCjZiRP8Ss0HqHeRdMGYcSxnijT8nAJCgc5Cry4RvcXkfranULlSA17mgc0MZUWCl41lJMfea5mfE2CvDfpVvE-CbKgF5B1ADgRQKuHJYIlX2IDdhRHHV6QJRHhZQviVgYA=w510-h507-no"
                ></v-img>
              </v-avatar>
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn class="close-btn" fab color="white" @click="overlay = false">
            <v-icon color="black">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    absolute: true,
    overlay: false,
    isTextField: false,
    showNextBikes: true,
    showRhingo: true,
    showTier: true
  }),
  methods: {
    sendData: function() {
      this.$emit("provider", [
        this.showNextBikes,
        this.showRhingo,
        this.showTier
      ]);
    }
  }
};
</script>

<style scoped>
.showTextField {
  z-index: 3;
  position: fixed;
  right: 7vw;
  top: 30vh;
}

.first-flex-box {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.first-chip {
  width: 40vw;
  display: flex;
  justify-content: space-evenly;
}

.display-1 {
  margin-bottom: 2vh;
}

.headline {
  margin-bottom: 2vh;
  margin-top: 6vh;
}

.mx-auto {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.8);
}

.close-btn {
  position: fixed;
  right: 7vw;
  bottom: 2.5vh;
}
</style>