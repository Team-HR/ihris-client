<template>
  <div>
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col class="grow">
          <h1>Error 403</h1>
          <h4>Access Forbidden!</h4>
          You don't have access to this page. You can either return to the
          previous page or go back to our homepage.
        </v-col>
      </v-row>
      <v-btn to="/" text>Return Home</v-btn>
    </v-alert>
  </div>
</template>
