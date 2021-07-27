<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Competency Setup</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn text color="primary" @click="$router.go(-1)">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
     <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
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
                to: "/departments",
                icon: "mdi-cog",
                title: "Assign Supervisors",
                subtitle: "Add offices and assign supervisors"
            },
            {
                to: "/office-overview",
                icon: "mdi-cog",
                title: "Office Overview",
                subtitle: "Shows list of offices and their assigned supervisors"
            },
        ]
    };
  },
  methods: {},
};
</script> 