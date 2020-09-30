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
      <template v-slot:[`item.full_name`]="{ item }">
        {{ item.full_name }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="success" small>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
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
      }
    ],
    employees: [],
    editedIndex: -1,
    editedItem: {
      last_name: "",
      first_name: "",
      middle_name: "",
      ext_name: ""
    },
    defaultItem: {
      last_name: "",
      first_name: "",
      middle_name: "",
      ext_name: ""
    }
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.dispatch("setAppLoading");
      this.axios
        .get("/employees")
        .then(res => {
          this.employees = res.data;
        })
        .then(() => {
          this.$store.dispatch("setAppLoadingDone");
        });
    },
    editItem(item) {
      // console.log(item);
    }
  }
};
</script>
