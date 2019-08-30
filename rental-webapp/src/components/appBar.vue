<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="panToCurrent">Rental App</span>
      </v-toolbar-title>
    </v-app-bar>
</template>

<script>

export default {
  name: 'App',
  components: {
    
    
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