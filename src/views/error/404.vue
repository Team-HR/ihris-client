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
      <v-btn to="/" text>Return Home</v-btn>
    </v-alert>
  </div>
</template>
