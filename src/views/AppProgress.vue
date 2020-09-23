<template>
  <v-progress-linear
    v-model="value"
    active
    :indeterminate="query"
    :query="true"
    background-color="white"
    app
  ></v-progress-linear>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      interval: 0
    };
  },
  computed: {
    query() {
      return this.$store.getters.getLoadingState;
    }
  }
};
</script>
