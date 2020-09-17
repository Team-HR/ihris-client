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
      // show: true,
      interval: 0
    };
  },

  mounted() {
    // this.queryAndIndeterminate()
    // console.log(this.$store.getters.getLoadingState());
  },

  beforeDestroy() {
    //   clearInterval(this.interval)
  },
  computed: {
    query() {
      return this.$store.getters.getLoadingState;
    }
  },
  methods: {
    //   queryAndIndeterminate () {
    //     this.query = true
    //     this.show = true
    //     this.value = 0
    //     setTimeout(() => {
    //       this.query = false
    //       this.interval = setInterval(() => {
    //         if (this.value === 100) {
    //           clearInterval(this.interval)
    //           this.show = false
    //           return setTimeout(this.queryAndIndeterminate, 2000)
    //         }
    //         this.value += 25
    //       }, 1000)
    //     }, 2500)
    // },
  }
};
</script>
