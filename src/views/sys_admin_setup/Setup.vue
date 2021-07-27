<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-account-settings</v-icon>
      </v-avatar>
      <v-toolbar-title>System Administration Setup</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
          <!-- <v-card class="mt-2">
            <v-card-title primary-title class="elevation-1">
              Password Settings
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="primary"
                :to="`/department/offices/${superior.department_id}/supervisory/${superior.office_id}/edit/${superior.id}`"
              >
                <v-icon class="mr-1">mdi-account-group-outline</v-icon>
                Change Password
              </v-btn>
            </v-card-actions>
          </v-card> -->
  <v-list
      subheader
      two-line
    >
    
      <v-list-item v-for="(setup,i) in setups" :key="i" link :to="setup.to">
        <v-list-item-avatar>
          <v-icon>{{setup.icon}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{setup.title}}</v-list-item-title>

          <v-list-item-subtitle>{{setup.subtitle}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-arrow-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>


      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setups: [
        {
          to: "/competency-setup",
          icon: "mdi-cog",
          title: "Competency Setup",
          subtitle: "Setting up competency assessment"
        }
      ],
    };
  },
  methods: {},
};
</script> 