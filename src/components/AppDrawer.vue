<template>
  <v-navigation-drawer
    class="mt-2"
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="12">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <!-- <v-col cols="6" class="text-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-col> -->
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
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawn: Boolean
  },
  watch: {
    drawn: function() {
      this.drawer = !this.drawer;
    }
  },
  data() {
    return {
      drawer: true,
      items: [
        { heading: "Navigation" },
        { icon: "mdi-view-dashboard", text: "Dashboard", path: "/dashboard" },
        {
          icon: "mdi-file-table",
          text: "Appointment",
          path: "/appointment"
        },
        {
          icon: "mdi-file-table",
          text: "Plantilla/JOW Contract",
          path: "/plantilla-jow-contract"
        },
        {
          icon: "mdi-file-table",
          text: "Payroll",
          path: "/payroll"
        },
        {
          icon: "mdi-file-table",
          text: "TLB",
          path: "/tlb"
        },

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
              path: "/user-accounts"
            },
            {
              icon: "mdi-account-group-outline",
              text: "User Groups",
              path: "/user-groups"
            }
          ]
        },
        { icon: "mdi-cog", text: "Settings" }
      ]
    };
  },
  mounted() {
    this.initialize;
  },
  methods: {
    initialize() {
      console.log(this.items);
    }
  }
};
</script>
