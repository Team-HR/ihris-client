<template>
  <v-app>
    <app-progress />
    <app-bar @toggled_drawer="drawer = !drawer" v-if="$auth.check()" />
    <app-drawer v-if="$auth.check()" :drawn="drawer" class="elevation-0 mt-1" />
    <v-card class="overflow-y-hidden">
      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        :max-height="window_height"
      >
        <v-main>
          <v-container
            :style="{ 'min-height': window_height + 'px' }"
            class="mb-15"
          >
            <router-view />
          </v-container>
        </v-main>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import AppProgress from "./views/AppProgress";
import AppBar from "./views/AppBar";
import AppDrawer from "./views/AppDrawer";
export default {
  data() {
    return {
      transitionName: "",
      drawer: true,
      window_height: 720
      // timer: ""
    };
  },
  components: {
    AppProgress,
    AppBar,
    AppDrawer
  },
  mounted() {
    this.window_height = window.screen.height * 0.9;
    // this.timer = setInterval(this.fetchEventsList, 3000);
  },
  methods: {
    // fetchEventsList() {
    //   console.log("fetchering...");
    //   this.$store.dispatch("appointment/init");
    // }
  }
};
</script>

<style>
html,
body {
  overflow: hidden !important;
}
</style>
