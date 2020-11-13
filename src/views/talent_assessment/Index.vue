<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Talent Assessment</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn color="primary" to="/talent-assessment/new"
        ><v-icon>mdi-plus</v-icon> Add New</v-btn
      >
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <template v-for="n in 10">
      <SurveyCard :key="n" />
    </template>
  </div>
</template>

<script>
import SurveyCard from "./SurveyCard";
export default {
  data() {
    return {};
  },
  components: {
    SurveyCard
  }
};
</script>

<style></style>
