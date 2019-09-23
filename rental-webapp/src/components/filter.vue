<template>
  <transition
    enter-active-class="animated slideInUp fast"
    leave-active-class="animated slideOutDown fast"
  >
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
              <v-list-item v-if="!selected.includes(i)" @click="selected.push(i)" color="black">
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
              <v-list-item v-if="!selected.includes(i)" @click="selected.push(i)" color="black">
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
  </transition>
</template>

<script>
import { nextTick } from "q";
export default {
  data: () => ({
    //Reihenfolge in Items darf nicht geändert werden!!!
    items: [
      {
        text: "Nextbike",
        color: "#194A97",
        bike: true,
        avatar: require("../assets/images/nextbike-logo.png")
      },
      {
        text: "Fordbike",
        color: "#EC1614",
        bike: true,
        avatar: require("../assets/images/fordbike-logo.png")
      },
      {
        text: "Rhingo",
        color: "#E30614",
        bike: false,
        avatar: require("../assets/images/rhingo-logo.png")
      },
      {
        text: "Tier",
        color: "#69D2AA",
        bike: false,
        avatar: require("../assets/images/tier-logo.png")
      },
      {
        text: "Lime",
        color: "#46DD00",
        bike: false,
        avatar: require("../assets/images/lime-logo.png")
      }
    ],
    loading: false,
    loading_deselect: false,

    selected: []
  }),

  methods: {
    updateProvider() {
      this.$emit("provider");
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
        this.selected = [0, 1, 2, 3, 4];
        this.loading = false;
      }, 200);
    }
  },

  created() {
    if (
      localStorage.getItem("NextBike") == "true" ||
      localStorage.getItem("NextBike") == null
    ) {
      this.selected.push(0);
    }
    if (localStorage.getItem("FordBike") == "true") {
      this.selected.push(1);
    }
    if (
      localStorage.getItem("Rhingo") == "true" ||
      localStorage.getItem("Rhingo") == null
    ) {
      this.selected.push(2);
    }
    if (
      localStorage.getItem("Tier") == "true" ||
      localStorage.getItem("Tier") == null
    ) {
      this.selected.push(3);
    }
    if (localStorage.getItem("Lime") == "true") {
      this.selected.push(4);
    }
  },

  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },

    // Entscheidet, ob die v-list-group Motorisierte Fahrzeuge angezeigt wird
    showMotorizedGroup() {
      return (
        !this.selected.includes(2) ||
        !this.selected.includes(3) ||
        !this.selected.includes(4)
      );
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
    selected: function reloadProvider() {
      localStorage.setItem("NextBike", this.selected.includes(0));
      localStorage.setItem("FordBike", this.selected.includes(1));
      localStorage.setItem("Rhingo", this.selected.includes(2));
      localStorage.setItem("Tier", this.selected.includes(3));
      localStorage.setItem("Lime", this.selected.includes(4));

      this.updateProvider();
    }
  }
};
</script>

<style scoped>
.chip {
  color: white;
  margin-bottom: 10px;
  margin-right: 0px;
  margin-left: 0px;
}

.container {
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