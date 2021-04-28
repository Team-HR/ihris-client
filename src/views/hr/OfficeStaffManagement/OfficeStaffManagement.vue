<template>
  <div>
    <v-toolbar>

      <v-app-bar-nav-icon>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>

      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>

      <v-toolbar-title>{{office}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- <v-card> -->
          list supervisors
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageID: 0,
      office: "",
      sups: []
    };
  },
  methods: {
    getSups(){
      var url = "office/"+ this.pageID
      this.axios.get(url).then((res) => {
        // TODO
        console.log(res.data)
        this.office = res.data.office
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        // TODO
      });
    }
  },
  mounted() {
    // get id of Office from url param
    this.pageID = this.$route.params.id
    this.getSups()
  },
  watch: {},
  
};
</script>