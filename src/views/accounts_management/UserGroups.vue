<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          ><v-icon class="ma-2">mdi-account-group-outline</v-icon> User
          Groups</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="350px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="ma-2" v-on="on" text
              >Add New</v-btn
            >
          </template>
          <v-form @submit.prevent="save">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Group Name"
                      :error-messages="errors.name"
                      placeholder="Name of group/role"
                      outlined
                    >
                    </v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text type="submit">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn color="primary" @click="editItem(item)" name="Edit" text
        ><v-icon class="mr-2">mdi-pencil</v-icon> Update</v-btn
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Actions", value: "actions", sortable: false, align: "center" },
      {
        text: "Group ID",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Group", align: "start", value: "name" },
      { text: "Date Created", align: "start", value: "created_at" },
      { text: "Date Updated", align: "start", value: "updated_at" }
    ],
    items: [],
    errors: {},
    editedIndex: -1,
    editedItem: {
      id: "",
      name: ""
    },
    defaultItem: {
      id: "",
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Group" : "Edit Group";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios.get("user-groups/index").then(res => {
        // console.log(res.data.data);
        this.items = Object.assign([], res.data.data);
      });
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.errors = Object.assign({}, {});
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.axios
          .post("user-groups/store", this.editedItem)
          .then(res => {
            // console.log(res.data.data);
            this.editedItem = Object.assign({}, res.data.data);
            Object.assign(this.items[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch(res => {
            // console.log(res.response.data.errors);
            this.errors = Object.assign({}, res.response.data.errors);
          });
      } else {
        // console.log(this.editedItem);
        this.axios
          .post("user-groups/store", this.editedItem)
          .then(res => {
            // console.log(res.data);
            this.editedItem = Object.assign({}, res.data.data);
            this.items.push(this.editedItem);
            this.close();
          })
          .catch(res => {
            // console.log(res.response.data.errors);
            this.errors = Object.assign({}, res.response.data.errors);
          });
      }
    }
  }
};
</script>
