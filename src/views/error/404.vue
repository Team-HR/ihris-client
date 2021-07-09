<template>
  <div>
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col class="grow">
          <h1>Error 404</h1>
          <h4>Page Not Found!</h4>
          We can't find the page you're looking for. You can either return to
          the previous page or go back to our homepage.
        </v-col>
      </v-row>
      <v-btn @click="back" text outlined>
        <v-icon>mdi-arrow-left</v-icon>
        Back</v-btn>
    </v-alert>
  </div>
</template>
<script>
export default {
  methods: {
    back(){
      window.history.back();
    }
  }
}
</script>

