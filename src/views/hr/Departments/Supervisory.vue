<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Supervisor Setup</v-toolbar-title>

      <v-divider class="mx-4" inset vertical></v-divider>

      <v-btn text color="primary" :to="`/department/offices/${department_id}`">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                :to="`/department/offices/${department_id}/supervisory/${id}/new`"
                >Add Supervisor</v-btn
              >
              <!-- <v-btn color="success" @click="addNew()">Add Supervisor</v-btn> -->
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn text color="primary" :to="`/supervisors/${item.id}`">
              <v-icon small> mdi-pencil </v-icon>
              Supervisors
            </v-btn>
          </template>
          <template v-slot:no-data> No Data Found! </template>
        </v-data-table>
        <!-- dialogs starts here -->
        <!-- add/edit dialog start -->
        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title class="headline grey lighten-5">
              Add/Edit Supervisor
            </v-card-title>
             <v-card-text>
      Explore hundreds of free API's ready for consumption! For more information visit
      <a
        class="grey--text text--lighten-3"
        href="https://github.com/toddmotto/public-apis"
        target="_blank"
      >the Github repository</a>.
    </v-card-text>
            <v-card-text>
             
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="saveEdit()"> Save </v-btn>
              <v-btn color="red" text @click="cancelEdit()"> Cancel </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- add/edit dialog end -->
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
          value: "supervisor",
        },
      ],

      dialog: false,
      formData: {},


    };
  },
  methods: {
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
        url: "/office/supervisors/" + this.id,
      }).then((res) => {
        console.log(res.data);
        // this.items = res.data;
      });
    },
    getDepartmentInfo() {
      var department_id = this.department_id;
      this.axios
        .get("/departments/" + department_id)
        .then((res) => {
          console.log(res.data);
          this.department = res.data.department;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getOfficeInfo() {
      var id = this.id;
      this.axios
        .get("/office/" + id)
        .then((res) => {
          console.log(res.data);
          this.office = res.data.office;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    // console.log(this.$route.params.id);
    this.id = this.$route.params.id;
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