<template>
  <div>




  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters({ testing: "getTesting" }),
  mounted() {
    console.log(this.$store.getters["auth/user"]);
  },
};
</script>

<style></style>
