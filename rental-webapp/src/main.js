import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.15.4/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/7.15.4/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>

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


