import Vue from "vue";
// Axios
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../../store/index";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueAxios, axios);

// axios.interceptors.request.use(config => {
//   store.dispatch("setAppLoading");
//   return config;
// });

// axios.interceptors.response.use(
//   response => {
//     store.dispatch("setAppDoneLoading");
//     return response;
//   },
//   error => {
//     store.dispatch("setAppDoneLoading");
//     return Promise.reject(error);
//   }
// );

export default {
  root: process.env.VUE_APP_API_URL
};
