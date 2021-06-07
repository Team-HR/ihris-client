<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>{{ superior_id?"Edit Personnel":"New Supervisor" }}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn
        text
        color="primary"
        @click="backHistory"
      >
      <!-- :to="`/department/offices/${department_id}/supervisory/${office_id}`" -->


        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-card>
          <v-card-title primary-title>
            {{ office }}
          </v-card-title>
          <v-card-text class="ma-0 pb-0">
            <v-autocomplete
              :readonly="superior_id ? true : false"
              :clearable="superior_id ? false : true"
              v-model="superior.model"
              :items="superior.entries"
              hide-no-data
              hide-selected
              item-text="full_name"
              item-value="employee_id"
              label="Assigned Supervisor"
              placeholder="Search for Supervisor's Name"
              prepend-icon="mdi-account-supervisor-circle-outline"
              return-object
              outlined
            ></v-autocomplete>
          </v-card-text>
          <v-card-text>
            <personnel-picker
              :initItems="subordinates"
              @changedSelected="changedSelected($event)"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn text color="success" @click="saveEdit">Save</v-btn>
            <v-btn text color="red" @click="cancelEdit">Cancel</v-btn>
          </v-card-actions>
        </v-card>

        <!-- content here end -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PersonnelPicker from "../../../components/PersonnelPicker.vue";
export default {
  // this.axios
  //   .get("/superior/get_free_employees")
  //   .then((res) => {
  //     console.log("superior_datas_mounted:", res.data);
  //     this.superior.entries = res.data;
  //   })
  //   .then((res) => {
  //     // this.superior.isLoading = false;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  components: {
    PersonnelPicker,
  },
  data() {
    return {
      test: [],
      superior_id: 0,
      office_id: 0,
      department_id: 0,
      department: "",
      office: "",
      subordinates: [],
      superior: {
        id: null,
        entries: [],
        isLoading: false,
        model: null,
        search: null,
      },
    };
  },
  mounted() {
    this.axios
      .get("superior/get_free_employees")
      .then((res) => {
        // console.log("superior_datas:", res.data);
        this.superior.entries = res.data;
      })
      .then((res) => {
        this.superior.isLoading = false;
      })
      .catch((err) => {
        console.error(err);
      });

    // console.log(this.$route.params.id);
    this.superior_id = this.$route.params.superior_id;
    this.office_id = this.$route.params.office_id;
    this.department_id = this.$route.params.department_id;
    // this.getDepartmentInfo();
    this.getOfficeInfo();

    if (this.superior_id > -1) {
      // console.log("Edit, ", this.superior_id)
      this.superior_id = this.superior_id;
      this.axios.get("/superior/get_info/" + this.superior_id).then((res) => {
        // console.log("superior_data:", res.data);
        this.superior.id = res.data.id;
        // full_name: res.data.full_name,
        this.superior.model = {
          employee_id: res.data.employee_id,
          full_name: res.data.full_name,
        };
        // console.log("this.superior_id:", this.superior);
        this.subordinates = Object.assign([], res.data.subordinates);

        // this.test = [
        //   {
        //     employee_id: 1,
        //     full_name: "MARTINEZ, ANTONIO M.",
        //     is_complete: 1,
        //   },
        //   {
        //     employee_id: 2,
        //     full_name: "BABOR, ERIC M.",
        //     is_complete: 0,saveEdit
        //   },
        // ];
      });
    } else {
      // console.log("Add");
    }
  },
  methods: {
    backHistory(){
      window.history.back()
    },
    cancelEdit() {
          this.$router.push(
            `/department/offices/${this.department_id}/supervisory/${this.office_id}`
          );
    },
    saveEdit() {
      var payload = {
        superior_id: this.superior.id,
        superior_employee_id: this.superior.model.employee_id,
        subordinates: null,
        office_id: this.office_id,
      };
      if (this.subordinates.length > 0) {
        payload.subordinates = JSON.parse(JSON.stringify(this.subordinates));
        payload.subordinates.forEach((item) => delete item.full_name);
      }
      // console.log(payload);
      // /**
      this.axios
        .post("/superior/create", payload)
        .then((res) => {
          // console.log("axios then:", res.data);
          this.$router.push(
            `/department/offices/${this.department_id}/supervisory/${this.office_id}`
          );
        })
        .catch((err) => {
          console.error(err);
        });
        // */
    },
    changedSelected(selected) {
      this.subordinates = JSON.parse(JSON.stringify(selected));
      // console.log(this.subordinates);
    },
    getDepartmentInfo() {
      var department_id = this.department_id;
      this.axios
        .get("/departments/get_info/" + department_id)
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
};
</script>
