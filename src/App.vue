<template>
  <v-app>
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
  mounted() {
    // this.window_height = window.screen.height * 0.9;
    // window.addEventListener("scroll", function(e) {
    //   var scrollPos = window.scrollY;
    //   var winHeight = window.innerHeight;
    //   var docHeight = document.documentElement.scrollHeight;
    //   var perc = (100 * scrollPos) / (docHeight - winHeight);
    //   console.log(scrollPos);
    // });
  }
};
</script>
