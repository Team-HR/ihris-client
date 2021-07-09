<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-account-settings</v-icon>
      </v-avatar>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col v-if="superior" cols="12" sm="12" md="6" class="mx-auto">
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
      <v-list-item link to="/settings-change-password">
        <v-list-item-avatar>
          <v-icon
            class="primary"
            dark
          >mdi-cog</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Password Settings</v-list-item-title>

          <v-list-item-subtitle>Change password</v-list-item-subtitle>
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
      superior_assessments: [
        {
          id: 1,
          title: "Change Password",
          description:
            "Change account password.",
        },
      ],
      superior: {},
    };
  },
  mounted() {
    // this.checkIfSuperior()
  },
  watch: {},
  methods: {
    checkIfSuperior() {
      this.axios({
        method: "get",
        url: "superior/authCheck",
      }).then((res) => {
        // console.log("authCheck: ",res.data);
        this.superior = JSON.parse(JSON.stringify(res.data));
      });
    },
  },
};
</script> 