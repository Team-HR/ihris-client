<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employees"
      :search="search"
      sort-by="last_name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Employees</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" @click="add_edit_dialog = !add_edit_dialog"
            ><v-icon>mdi-plus</v-icon> Add</v-btn
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            label="Search"
            placeholder="Employee Name"
            v-model="search"
            clearable
            class="mt-8"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <!-- <template v-slot:[`item.full_name`]="{ item }">
        {{ item.full_name }}
      </template> -->
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="success" small>
          <v-icon small class="mr-2" @click="test">
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
      </template> -->
      <template>
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="add_edit_dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <AddEditForm />
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import AddEditForm from "../components/aministrative_services/employees/AddEditForm";

export default {
  components: {
    AddEditForm
  },
  data: () => ({
    add_edit_dialog: true,
    search: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        width: 10
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: 10
      },
      {
        text: "Fullname",
        value: "full_name"
      },
      {
        text: "Gender",
        value: "gender"
      }
    ],
    employeesCopy: []
  }),
  computed: {
    ...mapGetters({
      employees: "employees/getItems"
    })
  },
  mounted() {
    this.init_load();
  },
  methods: {
    ...mapActions({
      init_load: "employees/initialize"
    })
  }
};
</script>
