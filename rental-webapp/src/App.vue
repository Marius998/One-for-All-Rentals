<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="panToCurrent">Rental App</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <gmap ref="gmap" >
      </gmap>
    </v-content>
  </v-app>
</template>

<script>
import gmap from './components/gmap';


export default {
  name: 'App',
  components: {
    gmap,
  },
  methods : {
      panToCurrent () {
          console.log("klick");
          this.$refs.gmap.panToCurrent();
      }
  },
  data: () => ({
    //
  }),
};
</script>
