<template>
  <v-app :style="{'background-image':'url('+bg+')'}">
  <!-- <v-app class="bg-img"> -->
    <app-progress />
    <app-bar @toggled_drawer="drawer = !drawer" v-if="$auth.check()" />
    <app-drawer v-if="$auth.check()" :drawn="drawer" class="elevation-0 mt-1" />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
        <back-to-top text="Back to top" visibleoffset="10">
          <v-btn color="primary" rounded icon large elevation="2">
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </back-to-top>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppProgress from "./views/AppProgress";
import AppBar from "./views/AppBar";
import AppDrawer from "./views/AppDrawer";
import BackToTop from "vue-backtotop";

export default {
  data() {
    return {
      bg: require('./assets/circuitboardbg.gif'),
      transitionName: "",
      drawer: true,
      window_height: 720
      // timer: ""
    };
  },
  components: {
    BackToTop,
    AppProgress,
    AppBar,
    AppDrawer
  },
  
  // updated() {
  //   console.log("getter: ",this.$store.getters["auth/user"]);
  // }
};
</script>

<style>
  .bg-img {
      background: url('https://vuejs.org/images/logo.png') no-repeat center center fixed;
      -moz-background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
  }
</style>