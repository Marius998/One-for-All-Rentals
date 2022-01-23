import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

console.debug(process.env.VUE_APP_MAPS_API_KEY)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API_KEY,
  },
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
