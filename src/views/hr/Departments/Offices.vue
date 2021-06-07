<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Office Setup</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>

      <v-btn text color="primary" to="/departments">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-data-table
          @click:row="handleClick"
          :headers="headers"
          :items="items"
          class="elevation-1"
          sort-by="id"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ department }}</v-toolbar-title>
              <v-divider inset vertical class="ma-2" />
              <v-btn color="success" :to="`/department/offices/${id}/new`" text
                >Add New Office</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              text
              color="primary"
              :to="`/department/offices/${id}/supervisory/${item.id}`"
            >
              <v-icon small> mdi-pencil </v-icon>
              Supervisors
            </v-btn>
          </template>
          <template v-slot:no-data> No Data Found! </template>
        </v-data-table>
        <!-- content here end -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      department: "",
      items: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: 10,
        },
        {
          text: "Section",
          align: "start",
          // sortable: false,
          value: "office",
        },
      ],
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    this.getDepartmentInfo();
    this.getItems();
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(item){
      // console.log(item);
      this.$router.push(`/department/offices/${item.department_id}/supervisory/${item.id}`);
    },
    getItems() {
      this.axios({
        method: "get",
        url: "/office/get_offices/" + this.id,
        // data: {
        //   id: this.id
        // }
      }).then((res) => {
        // console.log(res.data);
        this.items = res.data;
      });
    },
    getDepartmentInfo() {
      var department_id = this.id;
      this.axios
        .get("/department/get_info/" + department_id)
        .then((res) => {
          // console.log(res.data);
          this.department = res.data.department;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script> 