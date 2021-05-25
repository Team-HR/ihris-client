<template>
  <!-- clipped-left -->
  <v-app-bar
    class="mt-1"
    absolute
    scroll-target="body"
    elevate-on-scroll
    app
    dense
    v-if="$auth.check()"
    src="../assets/circuitboardbg.gif"
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>

    <v-app-bar-nav-icon @click.stop="toggle_drawer" large> </v-app-bar-nav-icon>

    <!-- <v-btn icon to="/cores">
      <img src="../assets/logo.svg" class="pa-0 ma-0" width="40" />
    </v-btn> -->

    <!-- <span class="ma-2"> Integrated Human Resource Information System </span> -->
    <v-toolbar-title>
      <span>
        IHRIS
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <!-- 
    <v-btn class="mt-1" text>Franz Joshua Valencia</v-btn>
    <v-menu bottom left offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon class="mr-2">
          <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          link
          href
          @click.prevent="$store.dispatch('auth/logout')"
          v-if="$auth.check()"
        >
          <v-list-item-avatar>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggle_drawer() {
      this.$emit("toggled_drawer");
    }
  }
};
</script>
