<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-account-arrow-right-outline</v-icon>
      </v-avatar>
      <v-toolbar-title>Employee Registration</v-toolbar-title>
      <v-divider inset vertical class="mx-5"></v-divider>
      <v-btn text color="primary" @click="$router.go(-1)">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="mx-auto">
        <!-- content here start -->
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="submit_form">
              <v-autocomplete
                clearable
                v-model="employee"
                :items="employees"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="id"
                label="Search for Employee"
                placeholder="Search for Employee's Name"
                return-object
                outlined
                :error-messages="err.employee_id"
              ></v-autocomplete>
              <v-text-field
                clearable
                outlined
                v-model="username"
                label="Username"
                placeholder="Username"
                :error-messages="err.username"
              />
              <v-text-field
                clearable
                outlined
                v-model="password"
                placeholder="Password"
                label="Password"
                :error-messages="err.password"
              />
              <v-btn color="success" type="submit">Add</v-btn>
            </v-form>

            <v-data-table
              :headers="users.headers"
              :items="users.items"
              class="elevation-1 mt-5"
              item-key="id"
              :search="search"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search Employee"
                  outlined
                  placeholder="Search name here"
                ></v-text-field>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small class="mr-2" @click="reset_password(item.id)">
                  Reset Password
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <!-- content here end -->
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.is_on">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.is_on = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      err: {
        employee_id: "",
        username: "",
        password: "",
      },
      snackbar: {
        is_on: false,
        text: "Changes saved!",
      },
      search: "",
      employee: {},
      username: "",
      password: "1234",
      // role: 'sup',
      roles: '["emp","sup"]',
      employees: [],
      users: {
        items: [],
        headers: [
          {
            text: "ID",
            align: "start",
            value: "id",
          },
          { text: "Employee ID", value: "employee_id" },
          { text: "Username", value: "username" },
          { text: "Name", value: "name" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      },
    };
  },
  mounted() {},
  watch: {},
  methods: {
    reset_password(id) {
      // console.log(id);
      this.axios
        .post("auth/reset_password", { id: id })
        .then((res) => {
          // console.log(res.data)
          this.snackbar.is_on = true;
          this.snackbar.text = "Password changed to '1234'";
        })
        .catch((err) => {
          // console.error(err);
        });
    },
    submit_form() {
      const data = {
        employee_id: this.employee.id,
        name: this.employee.name,
        username: this.username,
        password: this.password,
        roles: this.roles,
      };

      // console.log(data);
      this.axios
        .post("auth/store", data)
        .then((res) => {
          this.snackbar.is_on = true;
          this.snackbar.text = "Created new account for " + this.employee.name;
          // console.log(res.data);
          // reset form start
          this.errors = [];
          this.employee = {};
          this.username = "";
          this.password = "1234";

          this.err.employee_id = "";
          this.err.username = "";
          this.err.password = "";

          // reset form end
          this.get_users();
        })
        .catch((err) => {
          // const errors = err.response.data.errors;
          // console.log(errors);
          var errors = JSON.parse(JSON.stringify(err.response.data.errors));
          // console.log(errors)

          // var errmsg = "";

          // console.log(Object.entries(errors));
          // Object.entries(errors).forEach(err => {
          //   errmsg += err[0]+': '+ err[1]+ '\n'
          // });

          this.err.employee_id = errors.employee_id;
          this.err.username = errors.username;
          this.err.password = errors.password;

          // this.snackbar.is_on = true;
          // this.snackbar.text = errmsg;
        });
    },
    get_employees() {
      this.axios
        .get("employee/get_employees")
        .then((res) => {
          // console.log(res.data);
          this.employees = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err) => {
          // console.error(err);
        });
    },
    get_users() {
      this.axios
        .get("auth/get_users")
        .then((res) => {
          // console.log(res.data);
          this.users.items = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err) => {
          // console.error(err);
        });
    },
  },
  mounted() {
    this.get_employees();
    this.get_users();
  },
};
</script> 