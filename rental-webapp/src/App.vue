<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Rental App</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <gmap/>
    </v-content>
  </v-app>
</template>

<script>
import gmap from './components/gmap'

export default {
  name: 'App',
  components: {
    gmap,
  },
  data: () => ({
    //
  }),
};
</script>
