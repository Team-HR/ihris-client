<template>
  <v-app-bar
    dense
    absolute
    color="indigo darken-2"
    dark
    clipped-left
    scroll-target="#scrolling-techniques"
    app
    v-if="$auth.check()"
    src="../assets/circuitboardbg.gif"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,208,.3), rgba(128,208,100,.3)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon @click.stop="toggle_drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>HR Documents Monitoring System</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/">
      <v-icon>mdi-home-circle-outline</v-icon>
    </v-btn>

    <!-- <v-btn icon to="dashboard" v-if="$auth.check()">
            <v-icon>mdi-monitor-dashboard</v-icon>
        </v-btn> -->

    <!-- <v-btn icon to="login" v-if="!$auth.check()">
      <v-icon>mdi-login</v-icon>
    </v-btn> -->

    <v-btn
      link
      icon
      href
      @click.prevent="$store.dispatch('auth/logout')"
      v-if="$auth.check()"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      // routes: {
      //   // UNLOGGED
      //   unlogged: [
      //     { name: "Register", path: "register" },
      //     { name: "Login", path: "login" },
      //   ],
      //   // LOGGED USER
      //   user: [{ name: "Dashboard", path: "dashboard" }],
      //   // LOGGED ADMIN
      //   admin: [{ name: "Dashboard", path: "admin.dashboard" }],
      // },
    };
  },
  methods: {
    toggle_drawer() {
      this.$emit("toggled_drawer");
    }
  },
  mounted() {
    // console.log(this.$auth);
  }
};
</script>
