<template>
  <v-progress-linear
    v-model="value"
    reverse
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
      return this.$store.getters.stateload;
    }
  }
};
</script>
