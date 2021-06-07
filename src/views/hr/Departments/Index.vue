<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Departments</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-data-table
          @click:row="handleClick"
          disable-pagination
          dense
          :search="search"
          :headers="headers"
          :items="items"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:top>
            <v-text-field
              dense
              outlined
              v-model="search"
              label="Search"
              class="mx-4"
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn text color="primary" :to="`/department/offices/${item.id}`">
              <v-icon>mdi-folder-open-outline</v-icon>
              Office
            </v-btn>
          </template>
          <template v-slot:[`item.countOffices`]="{ item }">
            <span v-if="item.countOffices > 1">{{
              item.countOffices + " Offices"
            }}</span>
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
      items: [],
      dialog: false,
      search: "",
      dialogDelete: false,
      headers: [
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: 25,
        },
        {
          text: "Department",
          align: "start",
          value: "department",
        },
        {
          // text: "No. of Sections",
          align: "center",
          value: "countOffices",
        },
      ],
    };
  },
  mounted() {
    this.getItems();
  },
  watch: {},
  methods: {
    handleClick(item) {
      // console.log(item);
      this.$router.push(
        `/department/offices/${item.id}`
      );
    },
    getItems() {
      this.axios({
        method: "get",
        url: "/department",
      }).then((res) => {
        // console.log(res.data);
        this.items = res.data;
      });
    },
  },
};
</script> 