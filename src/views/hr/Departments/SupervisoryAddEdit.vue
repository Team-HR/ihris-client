<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>New Supervisor</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn
        text
        color="primary"
        :to="`/department/offices/${department_id}/supervisory/${office_id}`"
      >
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
              dense
              v-model="supervisor.model"
              :items="supervisor.entries"
              :loading="supervisor.isLoading"
              :search-input.sync="supervisor.search"
              hide-details
              hide-no-data
              hide-selected
              item-text="full_name"
              item-value="employee_id"
              label="Assigned Supervisor"
              placeholder="Start typing to Search"
              prepend-icon="mdi-account-supervisor-circle-outline"
              return-object
              menu-props="auto, overflowY"
              outlined
              clearable
            ></v-autocomplete>
          </v-card-text>
          <v-card-text>
            <personnel-picker @changedSelected="changedSelected($event)" />
          </v-card-text>
          <v-card-actions>
            <v-btn text color="success" @click="saveEdit">Save</v-btn>
            <v-btn text color="red">Cancel</v-btn>
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
  components: {
    PersonnelPicker,
  },
  data() {
    return {
      superior_id: 0,
      office_id: 0,
      department_id: 0,
      department: "",
      office: "",
      subordinates: [],
      supervisor: {
        id: null,
        entries: [],
        isLoading: false,
        model: null,
        search: null,
      },
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.superior_id = this.$route.params.superior_id;

    if (this.superior_id) {
      console.log("Edit")
      this.superior_id = this.superior_id
      this.axios.get("/superior/"+this.superior_id).then(res=>{
        console.log("superior_data:",res.data);
      })

    } else {
      console.log("Add")
    }

    this.office_id = this.$route.params.office_id;
    this.department_id = this.$route.params.department_id;
    // this.getDepartmentInfo();
    this.getOfficeInfo();
  },
  computed: {},
  watch: {
    "supervisor.search"(val) {
      // Items have already been loaded
      if (this.supervisor.entries.length > 0) return;
      // Items have already been reques ted
      if (this.supervisor.isLoading) return;
      this.supervisor.isLoading = true;
      this.axios
        .get("competency/free_employees")
        .then((res) => {
          // console.log(res)
          this.supervisor.entries = res.data;
        })
        .then((res) => {
          this.supervisor.isLoading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  methods: {
    saveEdit() {
      var payload = {
        superior_id: this.supervisor.id,
        superior_employee_id: this.supervisor.model.employee_id,
        subordinates: null,
        office_id: this.office_id
      };
      if (this.subordinates.length > 0) {
        payload.subordinates = this.subordinates;
        payload.subordinates.forEach((item) => delete item.full_name);
      }
      // console.log(payload);

      this.axios
        .post("/superior/create", payload)
        .then((res) => {
          console.log('axios then:',res.data)
          this.$router.push(`/department/offices/${this.department_id}/supervisory/${this.office_id}`)
        })
        .catch((err) => {
          // console.error(err);
        });
    },
    changedSelected(selected) {
      this.subordinates = JSON.parse(JSON.stringify(selected));
      console.log(this.subordinates);
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
      var office_id = this.office_id;
      this.axios
        .get("/office/" + office_id)
        .then((res) => {
          console.log(res.data);
          this.office = res.data.office;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script> 