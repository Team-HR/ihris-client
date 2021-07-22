<template>
<div>
<!-- centered container starts here -->
  <v-container fluid>
  <v-layout justify-center align-center>
    <v-flex shrink>
      <div>
        <img src="../../assets/logo.svg" alt="">
      </div>
    </v-flex>
  </v-layout>
  <v-layout justify-center align-center>
    <v-flex shrink>
      <div>
        <v-card-title class="grey--text">ONLINE ASSESSMENT MODULE</v-card-title>
      </div>
    </v-flex>
  </v-layout>
  </v-container>
  <!-- centered container ends here -->
  <v-card class="mx-auto my-0" max-width="344">
    <!-- <v-card-title class="primary white--text">LOGIN</v-card-title> -->
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          outlined
          v-model="form.body.username"
          name="username"
          :error-messages="errors.username"
          label="Username"
          required
          type="text"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="form.body.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors.password"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="Password"
          hint="At least 8 characters"
          @click:append="show1 = !show1"
        ></v-text-field>
        <!-- <v-checkbox
          class="py-0 my-0"
          v-model="form.remember"
          label="Remember Me"
        ></v-checkbox>
        <v-checkbox
          class="py-0 my-0"
          v-model="form.staySignedIn"
          label="Stay Signed-in"
        ></v-checkbox> -->
        
        <!-- <v-btn type="submit" color="primary" class="mr-4">LOGIN</v-btn> -->
         <v-btn
         type="submit"
          color="primary white--text"
        >
          <v-icon class="mr-5">mdi-login-variant</v-icon>
          Login</v-btn
        >
        <!-- <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn> -->
        
      </v-form>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        body: {
          username: "",
          password: ""
        },
        remember: false,
        fetchUser: true,
        staySignedIn: false
      },
      errors: {},
      show1: false
    };
  },

  methods: {
    login() {
      // console.log(this.form);
      this.$store.dispatch("auth/login", this.form).catch(error => {
        // console.log(res);
        // this.errors = Object.assign({}, res.errors);
        console.log(error[0].status)
        
      });
    },
    reset() {
      // this.$refs.form.reset();
      this.errors = Object.assign({}, {});
    }
  }
};
</script>
