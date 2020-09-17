<template>
  <div v-if="$auth.check()">
    <span>Logged In!</span>
    <button @click="logoutThen">
      Logout
    </button>
  </div>
  <div v-else-if="!$auth.check()">
    <span>Not Logged In</span>
  </div>
</template>

<script>
export default {
  methods: {
    logoutThen() {
      this.$auth
        .logout({
          redirect: null
        })
        .then(() => {
          this.$router.push({ name: "auth-login" });
        });
    }
  }
  // mounted() {
  //     this.$http({
  //         url: 'auth/user'
  //     })
  //     .then(() => {
  //         console.log('success')
  //     }, () => {
  //         console.log('error')
  //     })
  //     .catch(() => {
  //         console.log('catch')
  //     });
  // }
};
</script>
