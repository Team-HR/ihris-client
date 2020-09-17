import Vue from "vue";

export default {
  namespaced: true,

  state() {
    return {};
  },

  actions: {
    fetch(data) {
      return Vue.auth.fetch(data);
    },

    refresh(data) {
      return Vue.auth.refresh(data);
    },

    login(ctx, data) {
      data = data || {};
      console.log(data);
      return new Promise((resolve, reject) => {
        Vue.auth
          .login({
            url: "auth/login",
            data: data.body, // Axios
            remember: data.remember,
            staySignedIn: data.staySignedIn
          })
          .then(res => {
            if (data.remember) {
              Vue.auth.remember(
                JSON.stringify({
                  name: ctx.getters.user.first_name
                })
              );
            }
            // this.commit("SET_APP_DONE_LOADING");
            resolve(res);
          })
          .catch(res => {
            reject(res.response.data);
          });
      });
    },

    // register(ctx, data) {
    //   data = data || {};
    //   // console.log(data);
    //   return new Promise((resolve, reject) => {
    //     Vue.auth
    //       .register({
    //         url: "auth/register",
    //         // body: data.data, // VueResource
    //         data: data.data, // Axios
    //         autoLogin: false
    //       })
    //       .then(() => {
    //         if (data.autoLogin) {
    //           ctx.dispatch("login", data).then(resolve, reject);
    //         }
    //       }, reject);
    //   });
    // },

    // impersonate(ctx, data) {
    //   //   var props = this.getters["properties/data"];
    //   Vue.auth.impersonate({
    //     url: "auth/" + data.user.id + "/impersonate",
    //     redirect: "user-account"
    //   });
    // },

    // unimpersonate() {
    //   Vue.auth.unimpersonate({
    //     redirect: "admin-users"
    //   });
    // },

    logout() {
      // this.commit("SET_APP_IS_LOADING");
      return Vue.auth.logout().then(() => {
        // this.commit("SET_APP_DONE_LOADING");
      });
    }
  },

  getters: {
    user() {
      return Vue.auth.user();
    },

    impersonating() {
      return Vue.auth.impersonating();
    }
  }
};
