<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Supervisor Setup</v-toolbar-title>

      <v-divider class="mx-4" inset vertical></v-divider>

      <!-- <v-btn text color="primary" :to="`/department/offices/${department_id}`">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn> -->
      <v-btn text color="primary" @click="$router.go(-1)">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-data-table @click:row="handleClick" :headers="headers" :items="items" class="elevation-1" disable-pagination hide-default-footer>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                :to="`/department/offices/${department_id}/supervisory/${office_id}/new`"
                >Add Supervisor</v-btn
              >
              <!-- <v-btn color="success" @click="addNew()">Add Supervisor</v-btn> -->
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" :to="`/department/offices/${department_id}/supervisory/${office_id}/edit/${item.id}`">
              <v-icon small> mdi-pencil </v-icon>
               Edit
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
      office_id: 0,
      department_id: 0,
      department: "",
      office: "",
      items: [],
      headers: [
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: 10,
        },
        {
          text: "Supervisor",
          align: "start",
          // sortable: false,
          value: "full_name",
        },
      ],

      dialog: false,
      formData: {},


    };
  },
  methods: {
    handleClick(item){
      // console.log(item);
      this.$router.push(
        `/department/offices/${this.department_id}/supervisory/${item.office_id}/edit/${item.id}`
      );
    },
    addNew() {
      this.dialog = true;
    },
    saveEdit() {
      this.dialog = false;
    },
    cancelEdit() {
      this.dialog = false;
    },
    getItems() {
      // get office supervisors
      this.axios({
        method: "get",
        url: "/superior/get_superiors/" + this.office_id,
      }).then((res) => {
        // console.log(res.data);
        this.items = res.data;
      });
    },
    getDepartmentInfo() {
      var department_id = this.department_id;
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
    getOfficeInfo() {
      var office_id = this.office_id;
      this.axios
        .get("/office/get_info/" + office_id)
        .then((res) => {
          // console.log(res.data);
          this.office = res.data.office;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    // console.log(this.$route.params.office_id);
    this.office_id = this.$route.params.office_id;
    this.department_id = this.$route.params.department_id;
    // this.$nextTick(function () {
    this.getDepartmentInfo();
    this.getOfficeInfo();
    this.getItems();
    // });
  },
  computed: {
    tableTitle() {
      if (!this.department && !this.office) return "";
      return this.department + " / " + this.office;
    },
   
  },
  
};
</script> 