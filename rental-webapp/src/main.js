import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDP0J6PujCjhbuKcqJOfXvuiwgxyGYXKOc'
    
  },
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


