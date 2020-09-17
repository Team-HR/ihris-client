<template>
  <v-app>
    <!-- <v-progress-linear value="0"></v-progress-linear> -->
    <AppProgress />
    <v-card class="overflow-y-hidden">
      <app-drawer v-if="$auth.check()" :drawn="drawer" />
      <app-bar @toggled_drawer="drawer = !drawer" v-if="$auth.check()" />
      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        :max-height="window_height"
      >
        <!-- Sizes your content based upon application components -->
        <v-main>
          <!-- Provides the application the proper gutter -->
          <v-container
            fluid
            :style="{ 'min-height': window_height + 'px' }"
            class="mb-15"
          >
            <!-- If using vue-router -->
            <!-- <transition> -->
            <router-view />
            <!-- </transition> -->
          </v-container>
        </v-main>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import AppProgress from "./components/AppProgress";
import AppBar from "./components/AppBar";
import AppDrawer from "./components/AppDrawer";
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
  /* margin: 0; */
  overflow: hidden !important;
}
</style>
