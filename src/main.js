import Vue from "vue";
import App from "./App.vue";
import http from "./configs/http";
import store from "./store";
import router from "./router";
import auth from "./configs/auth";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
// import Echo from "laravel-echo";

// window.Pusher = require("pusher-js");

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "3e75cdb11c6e10f72397",
//   wsHost: window.location.hostname,
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true
// });

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  http: http,
  store: store,
  router: router,
  auth: auth,
  vuetify,
  render: h => h(App)
});
