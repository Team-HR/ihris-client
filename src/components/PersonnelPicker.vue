<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="mx-auto">
        <!-- selected table start -->
        <v-autocomplete
          @change="addItemAction"
          label="Add Personnels"
          placeholder="Search for personnel's name to add..."
          prepend-icon="mdi-account-multiple-plus"
          outlined
          clearable
          v-model="addItem"
          return-object
          :items="selection.items"
          item-text="full_name"
          item-value="employee_id"
        />
        <v-data-table
          :headers="selected.headers"
          :items="selected.items"
          :search="selected.search"
          sort-by="id"
          class="elevation-0"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}.)</td>
              <td>
                <v-btn
                  :disabled="item.is_complete == 1 ? true : false"
                  color="error"
                  @click="addRemoveItem(item)"
                >
                  <!-- <v-icon>mdi-account-remove-outline</v-icon> -->
                  Remove
                </v-btn>
              </td>

              <td>{{ item.full_name }}</td>
              <td>
                {{
                  item.is_complete
                    ? "COMPLETED, CANNOT BE REMOVED"
                    : "TO BE ASSESSED"
                }}
              </td>
            </tr>
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
    addItem: null,
    selection: {
      items: [],
    },
    selected: {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "number",
          width: 10,
        },
        {
          text: "Actions",
          align: "center",
          value: "actions",
          sortable: false,
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
    initItems(val, oldVal) {
      // console.log("ping:", val);
      if (val.length > 0) {
        this.selected.items = val;
        val.forEach((item) => {
          var index = this.selection.items
            .map(function (el) {
              return el.employee_id;
            })
            .indexOf(item.employee_id);
          // console.log(index);
          if (index > -1) {
            this.selection.items.splice(index, 1);
          }
        });
      }
      // console.log(this.selection.items);
    },
  },

  mounted() {
    this.initialize();
  },
  created() {},

  methods: {
    addItemAction() {
      this.addRemoveItem(this.addItem);
      this.addItem = {};
    },
    initialize() {
      this.axios
        .get("superior/get_free_employees")
        .then((res) => {
          this.selection.items = res.data;
        })
        .then((res) => {})
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
      // console.log(item);
      // console.log(this.selection.items);
      this.$emit("changedSelected", this.selected.items);
    },
  },
};
</script>