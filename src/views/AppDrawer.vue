<template>
  <v-navigation-drawer v-model="drawer" app>
    <!-- :clipped="$vuetify.breakpoint.lgAndUp" -->

    <v-list>
      <v-list-item two-line>
        <v-list-item-avatar>
          <!-- <img src="https://randomuser.me/api/portraits/men/81.jpg" /> -->
          <v-icon large>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user().name }}</v-list-item-title>
          <!-- <v-list-item-subtitle>{{$auth.user().roles}}</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <template v-for="item in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center"
          no-gutters
        >
          <v-col cols="12">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :to="child.path"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          @click.prevent="$store.dispatch('auth/logout')"
          v-if="$auth.check()"
        >
          <v-icon class="mr-5">mdi-logout-variant</v-icon>
          Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawn: Boolean,
  },
  watch: {
    drawn: function () {
      this.drawer = !this.drawer;
    },
  },
  data() {
    return {
      drawer: true,
      items: [
        { heading: "Navigation" },
        // { icon: "mdi-home-circle-outline", text: "Home", path: "/" },

        // { icon: "mdi-pencil-ruler", text: "Competency Assessment", path: "/competency" },
        { icon: "mdi-pencil-ruler", text: "Assessments", path: "/assessments" },
        // { icon: "", text: "Staff Management", path: "/staff-management" },
        // { icon: "mdi-view-dashboard", text: "Cores", path: "/cores" },
        // {
        //   icon: "mdi-account-box-multiple-outline",
        //   text: "Employees",
        //   path: "/employees"
        // },
        { heading: "System Administration" },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: "Accounts Management",
          model: false,
          children: [
            {
              icon: "mdi-account-settings-outline",
              text: "User Accounts",
              path: "/user-accounts",
            },
            {
              icon: "mdi-account-group-outline",
              text: "User Groups",
              path: "/user-groups",
            },
          ],
        },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: "Office Setup",
          model: false,
          children: [
            {
              icon: "mdi-account-supervisor-circle-outline",
              text: "Departments",
              path: "/departments",
            },
            {
              icon: "mdi-account-supervisor-circle-outline",
              text: "Supervisors",
              path: "/office-staff-management",
            },
          ],
        },
        // { icon: "mdi-cog", text: "Settings" }
      ],
    };
  },
  mounted() {
    this.initialize;
  },
  methods: {
    initialize() {
      console.log(this.items);
    },
  },
};
</script>
