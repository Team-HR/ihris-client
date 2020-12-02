<template>
  <v-card class="mx-auto" max-width="512" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{survey.created_at}}
        </div>
        <v-list-item-title class="headline mb-1">
          {{survey.title}}
        </v-list-item-title>
        <v-list-item-subtitle>Created by: HRMO </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile size="80" color="yellow">
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn>
        Take Assessment
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn>
        Edit Assessment
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props:{
    survey: Object
  }
};
</script>

<style></style>
