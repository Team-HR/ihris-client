<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Assessments</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- <v-card> -->

        <v-card class="mt-2">
          <v-card-title primary-title> Competency Assessment </v-card-title>
          <v-card-subtitle
            >Status: <span class="red--text">Incomplete</span></v-card-subtitle
          >
          <v-card-text>
            Assessment for supervisors assessing their subordinates'
            competencies.
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" to="/assessments/1" text>Start</v-btn>
            <v-btn color="primary" text>Personnels</v-btn>
          </v-card-actions>
        </v-card>

        <!-- </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>