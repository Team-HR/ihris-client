<template>
  <div>
    <!-- <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Assessments</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar> -->
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">        
          <v-card class="mt-2">
            <v-card-title primary-title class="primary--text">
              <h1>
              Welcome!
              </h1>
            </v-card-title>
            <v-card-subtitle>
              
            </v-card-subtitle>
            <v-card-text>
              <p>
              This online assessment module/platform aims to ease and hasten our HR's survey processes essential for gathering personnel information vital to our <b>Integrated Human Resource Management System</b>. Accessible anytime anywhere.
              </p>
              <p>
              See list of available assessments from link below.
              </p>
              <v-btn
                color="primary" to="/assessments">
                <v-icon>mdi-menu-right-outline</v-icon>
                Go to Assessments
              </v-btn>
            </v-card-text>
            <!-- <v-card-actions>
              <v-btn
                color="success" to="/assessments">
                <v-icon>mdi-menu-right-outline</v-icon>
                Go to Assessments
              </v-btn>
            </v-card-actions> -->
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

};
</script> 