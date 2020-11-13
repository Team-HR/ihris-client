<template>
  <div>

        <!-- <v-select
          :items="select_employees"
          multiple
          label="Employees"
          v-model="selected_employees"
        ></v-select> -->
    <!-- <li v-for="emp in select_departments" :key="emp.id">{{emp}}</li> -->
    <!-- list of employees, searchable and sortable by department -->

  <v-data-table
    v-model="selected_employees"
    :headers="headers"
    :items="select_employees"
    item-key="value"
    show-select
    class="elevation-1"
  >
<template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
    <v-select
          :items="select_departments"
          label="Department"
          v-model="selected_department"
          @change="search"
        ></v-select>
      </v-toolbar>
    </template>
  </v-data-table>

    <v-btn @click="search">Search</v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      select_employees: [],
      select_departments: [],
      selected_department: 1,
      selected_employees: [],
      headers: [
          // {
          //   text: 'ID',
          //   align: 'start',
          //   value: 'value',
          // },
          { text: 'Name', value: 'text' },
          { text: 'Department', value: 'department' },
        ],
    };
  },
  methods: {
    search(){
      // alert(this.selected_department);
      this.get_select_employees(this.selected_department).then(res => {
      this.select_employees = res;
    });
    },
    ...mapActions({
      initialize: "employees/initialize",
      get_select_employees: "employees/get_select_items",
      get_select_departments: "departments/get_select_items",
    })
  },
  computed: {
    ...mapGetters({
      _employees: "employees/getItems"
    })
  },
  mounted() {
    this.initialize().then(res => {
      // console.log(res);
      this.employees = res;
    });
    this.get_select_employees(this.selected_department).then(res => {
      this.select_employees = res;
    });
    this.get_select_departments().then(res => {
      this.select_departments = res;
      // console.log("select_departments",res);
    });
  }
};
</script>

<style></style>
