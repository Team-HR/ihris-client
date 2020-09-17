<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          ><v-icon class="ma-2">mdi-account-settings-outline</v-icon> Users
          Accounts</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="350px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="ma-2" v-on="on" text
              >Register</v-btn
            >
          </template>
          <v-form @submit.prevent="save">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-divider class="mx-4 mb-4"></v-divider>
              <v-card-text>
                <v-text-field
                  autofocus
                  v-model="editedItem.name"
                  placeholder="Fullname"
                  label="Name"
                  :error-messages="errors.name"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  placeholder="Username"
                  outlined
                  :error-messages="errors.username"
                ></v-text-field>

                <v-select
                  v-model="editedItem.roles"
                  :items="roles"
                  label="Roles"
                  multiple
                  chips
                  :error-messages="errors.roles"
                ></v-select>
                <v-switch
                  class="ml-2"
                  v-if="editedIndex !== -1"
                  v-model="password_reset"
                  inset
                  label="Password Reset"
                ></v-switch>
                <template v-if="password_reset || editedIndex == -1">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    placeholder="Password"
                    outlined
                    :error-messages="errors.password"
                  ></v-text-field>
                </template>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" type="submit" text>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.roles`]="{ item }">
      <v-chip v-for="role in item.roles" :key="role" class="mr-1">
        {{ role }}
      </v-chip>
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
        text: "User ID",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Username", value: "username" },
      { text: "Roles", value: "roles" },
      { text: "Date Created", align: "start", value: "created_at" },
      { text: "Date Updated", align: "start", value: "updated_at" }
    ],
    roles: [],
    users: [],
    password: "",
    password_reset: false,
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      username: "",
      roles: []
    },
    defaultItem: {
      id: null,
      name: "",
      username: "",
      roles: []
    },
    errors: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Register New" : "Update Account";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    console.log();
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios
        .get("auth/users")
        .then(result => {
          this.users = result.data.data;
        })
        .catch(err => {
          console.log(err.response.data);
        });

      this.axios.get("user-groups/index").then(res => {
        this.roles = Object.assign(
          [],
          res.data.data.map(({ name }) => name)
        );
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.password = "";
        this.password_reset = false;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.errors = Object.assign({}, {});
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // update account
        this.editedItem["password"] = this.password;
        this.editedItem["password_reset"] = this.password_reset;
        this.axios
          .post("auth/update", this.editedItem)
          .then(res => {
            // console.log(res.data.data);
            this.editedItem = Object.assign({}, res.data.data);
            Object.assign(this.users[this.editedIndex], this.editedItem);
            this.close();
          })
          .catch(res => {
            console.log(res.response.data);
            this.errors = Object.assign({}, res.response.data.errors);
          });
      } else {
        // register new user account
        this.editedItem["password"] = this.password;
        this.editedItem["password_reset"] = false;
        this.axios
          .post("auth/store", this.editedItem)
          .then(() => {
            // console.log(res.data.data);
            // this.users.push(this.editedItem);
            this.initialize();
            this.close();
          })
          .catch(res => {
            // console.log(res.response.data);
            this.errors = Object.assign({}, res.response.data.errors);
          });
      }
      // console.log(this.editedItem);
    }
  }
};
</script>
