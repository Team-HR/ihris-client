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
    <template v-for="(survey, index) in surveys">
      <SurveyCard :key="index" :survey="survey"/>
    </template>
  </div>
</template>

<script>
import SurveyCard from "./SurveyCard";
export default {
  data() {
    return {
      surveys: [],
    };
  },
  components: {
    SurveyCard,
  },
  methods: {
    init() {
      // console.log("TEST");
      this.axios
        .get("/talent-assessment/")
        .then((response) => {
          // handle success
          console.log(response.data);
          this.surveys = Object.assign([], response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style></style>
