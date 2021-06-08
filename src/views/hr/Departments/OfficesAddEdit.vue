<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Add New Office</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn text color="primary" :to="`/department/offices/${department_id}`">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- content here start -->

    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="office_input"
              label="Office Name"
              placeholder="Name of office"
              required
              outlined
            ></v-text-field>
            <!-- <v-text-field type="text" :value="office.toUpperCase()" @input="office = $event.target.value.toUpperCase()"/> -->
          </v-col>
        </v-row>
        <v-btn type="submit" color="success">Save</v-btn>
      </v-container>
    </v-form>

    <!-- content here end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      id: 0,
      department_id: 0,
      office: "",
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.department_id = this.$route.params.department_id;
  },
  computed: {
    office_input: {
      // getter
      get: function () {
        return this.office
      },
      // setter
      set: function (newValue) {
        this.office = newValue.toUpperCase();
        // return office;
      },
    },
  },
  watch: {},
  methods: {
    submitForm() {
      // console.log(this.office);
      this.axios
        .post("office/create", {
          department_id: this.department_id,
          office: this.office,
        })
        .then((res) => {
          // console.log(res.data);
          this.$router.push(`/department/offices/${this.department_id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDepartmentInfo() {
      var department_id = this.id;
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
  },
};
</script> 