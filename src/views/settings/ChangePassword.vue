<template>
  <div>
    <v-toolbar>
      <v-avatar>
        <v-icon>mdi-pencil-ruler</v-icon>
      </v-avatar>
      <v-toolbar-title>Change Password</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn text color="primary" @click="back">
        <v-icon>mdi-chevron-double-left</v-icon>
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="mx-auto">
            <v-card>
              <v-card-title></v-card-title>
              <v-card-text>
                <h3 class="header">Current Password</h3>
                <v-divider horizontal class="ma-1 mb-5"></v-divider>
                <v-text-field
                  v-model="currentPassword"
                  label="Current Password"
                  placeholder="Enter current password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  required
                  outlined
                ></v-text-field>
                
                <h3 class="header">New Password</h3>
                <v-divider horizontal class="ma-1 mb-5"></v-divider>
                <v-text-field

                  v-model="newPassword"
                  label="New Password"
                  placeholder="Enter current password"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                  outlined
                ></v-text-field>
                <div :hidden="show2 ? true : false">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter current password"
                    :rules="[rules.passwordMatch]"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    required
                    outlined
                  ></v-text-field>
                </div>
                <v-btn type="submit" color="primary">Update Password</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPassword: "",
      valid: null,
      show1: false,
      show2: false,
      newPassword: "",
      confirmPassword: "",
      rules: {
        passwordMatch: (value) =>
          value === this.newPassword || "Password does not match!",
      },
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    submitForm(){
      console.log("submitted! ", this.currentPassword + " "+ this.newPassword);

    this.axios.post("auth/change-password",{
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })

      this.resetForm()
    },
    resetForm(){
      this.currentPassword = ""
      this.newPassword = ""
      this.confirmPassword = ""
    }
  },
};
</script> 