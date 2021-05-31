<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="mx-auto yellow" :hidden="hideAddTable">
        <!-- selection table start -->
        <v-data-table
          :headers="selection.headers"
          :items="selection.items"
          :search="selection.search"
          sort-by="full_name"
          class="elevation-0"
          dense
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn color="red" text class="mr-2" @click="hideAddTable = true"
                >Done</v-btn
              >
              <v-toolbar-title> Add Subordinates </v-toolbar-title>
              <v-divider inset vertical class="ma-2" />

              <v-text-field
                hide-details
                dense
                v-model="selection.search"
                outlined
                label="Search"
                placeholder="Enter employee name to search..."
                clearable
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="green" @click="addRemoveItem(item)">
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <!-- selection table end -->
      </v-col>
      <v-col cols="12" sm="12" md="12" class="mx-auto">
        <!-- selected table start -->
        <v-data-table
          :headers="selected.headers"
          :items="selected.items"
          :search="selected.search"
          sort-by="full_name"
          class="elevation-0"
          dense
          disable-pagination
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="success"
                text
                class="mr-2"
                @click="hideAddTable = !hideAddTable"
                >{{ hideAddTable ? "Add" : "Done Adding" }}</v-btn
              >
              <v-toolbar-title> Subordinates </v-toolbar-title>
              <v-divider inset vertical class="ma-2" />

              <v-text-field
                v-if="selected.items.length > 0"
                hide-details
                dense
                v-model="selected.search"
                outlined
                label="Search"
                placeholder="Search subordinate by name..."
                clearable
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon color="red" @click="addRemoveItem(item)">
              <v-icon>mdi-account-remove-outline</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.is_complete`]="{ item }">
            {{item.is_complete?'Completed':'To be Assessed'}}
          </template>
        </v-data-table>
        <!-- selected table end -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    initItems: Array,
  },
  data: () => ({
    hideAddTable: true,
    selection: {
      headers: [
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: 10,
        },
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "employee_id",
          width: 10,
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "full_name",
        },
      ],
      search: "",
      items: [],
    },
    selected: {
      headers: [
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
          width: 10,
        },
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "employee_id",
          width: 10,
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "full_name",
        },
        {
          text: "Remarks",
          align: "start",
          sortable: true,
          value: "is_complete",
        },
      ],
      search: "",
      items: [],
    },
  }),

  watch: {
  
    initItems (val){
      // console.log("old_initItems:",oldVal);
      // console.log("initItems:",val);
        // this.supervisor.isLoading = false;
          if (val.length > 0) {
            this.selected.items = val//JSON.parse(JSON.stringify(val))
            // remove employees from initItems in selection.items
            val.forEach((item) => {
              var index = this.selection.items
                .map(function (el) {
                  return el.employee_id;
                })
                .indexOf(item.employee_id);
              // console.log("index:", index);
              this.selection.items.splice(index, 1);
            });
          }
    }
  
  },

  mounted() {
    // this.selected.items = JSON.parse(JSON.stringify(this.initItems))
    this.initialize();
    // console.log("initialize: ", this.initItems);
  },
  created() {},

  methods: {
    initialize() {
      // items = JSON.parse(JSON.stringify(this.dataItems))
      // console.log(items);
      this.axios
        .get("superior/get_free_employees")
        .then((res) => {
          // console.log(res)
          console.log("superior_datas_picker:", res.data);
          this.selection.items = res.data;
          // console.log(res.data);

        })

        .then((res) => {

        })

        .catch((err) => {
          console.error(err);
        });
    },
    addRemoveItem(item) {
      var index = this.selection.items
        .map(function (el) {
          return el.employee_id;
        })
        .indexOf(item.employee_id);
      if (index > -1) {
        this.selection.items.splice(index, 1);
        this.selected.items.push(item);
        this.selection.search = null;
      } else {
        index = this.selected.items
          .map(function (el) {
            return el.employee_id;
          })
          .indexOf(item.employee_id);
        this.selected.items.splice(index, 1);
        this.selection.items.push(item);
        this.selected.search = null;
      }
      this.$emit("changedSelected", this.selected.items);
    },
  },
};
</script>