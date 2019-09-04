<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">Rental App</v-toolbar-title>
    <template v-slot:extension>
      <v-tabs align-with-title background-color="transparent" color="red">
        <v-tab v-for="(item, i) in items" :key="i" router :to="item.route">{{item.title}}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>


<script>
export default {
  data: () => ({
    items: [{ title: "Karte", route: "/" }, { title: "Route", route: "/route" }]
  })
};
</script>