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
                  :error-messages="pass_err_msg"
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
                  :error-messages="new_pass_err_msg"
                  label="New Password"
                  placeholder="Enter current password"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="toggleShow2"
                  required
                  outlined
                ></v-text-field>
                <!-- :hidden="show2 ? true : false" -->
                <div >
                  <v-text-field
                    v-model="confirmPassword"
                    :error-messages="confirm_new_pass_err_msg"
                    label="Confirm Password"
                    placeholder="Enter current password"
                    :rules="[rules.passwordMatch]"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="toggleShow2"
                    required
                    outlined
                  ></v-text-field>
                </div>
                <v-btn :disabled="saving?true:false" type="submit" color="primary">Update Password</v-btn>
                <v-btn type="button" color="red" class="ml-2 white--text" @click.prevent="back()">Cancel</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>


<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      centered
      color="success"
    >
      Password changed successfully!

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click.prevent="$store.dispatch('auth/logout')"
        >
          Login Again
        </v-btn>
        <v-btn
          text
          v-bind="attrs"
          @click.prevent="back()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      pass_err_msg: "",
      new_pass_err_msg: "",
      confirm_new_pass_err_msg: "",
      saving: false,
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
  watch:{
    snackbar(val){
      if (!val) {
        this.back()
      }
    }
  },
  methods: {
    toggleShow2(){
      this.show2 = !this.show2
    },
    back() {
      window.history.back();
    },
    submitForm(){
      this.saving = true
      this.pass_err_msg = ""
      this.new_pass_err_msg = ""
      this.confirm_new_pass_err_msg = ""

      if (this.newPassword !== this.confirmPassword) {
        this.saving = false
        this.confirm_new_pass_err_msg = "Please confirm new password!"
        return false
      }

      this.axios.post("auth/change-password",{
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
      .then(res => {
        // console.log(res.data)
        if(!res.data.success){
          if(!res.data.confirmed){
            this.pass_err_msg = res.data.message
          } else if (!res.data.validated){
            this.new_pass_err_msg = res.data.message
          }
        } else {
          this.snackbar = true
          this.pass_err_msg = ""
          this.new_pass_err_msg =""
          this.resetForm()
          // this.back()
        }

        // this.error.password = res.data.error.password
        this.saving = false
        
        // console.log("submitted! ", this.currentPassword + " "+ this.newPassword);
      })
      .catch(err => {
        console.error(err); 
        this.saving = false
      })
    },
    resetForm(){
      this.currentPassword = ""
      this.newPassword = ""
      this.confirmPassword = ""
    }
  },
};
</script> 