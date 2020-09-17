import Vue from "vue";

// Vue Resource
// import VueResource from 'vue-resource';

// Vue.use(VueResource);
// Vue.http.options.root = process.env.VUE_APP_API_URL;

// Axios
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store/index";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueAxios, axios);

axios.interceptors.request.use(config => {
  // console.log("Interceptor Start!");
  // console.log(this.axios);
  store.dispatch("setAppLoading");
  // this.store.getters("getLoadingState");
  return config;
});

axios.interceptors.response.use(
  response => {
    // console.log("Interceptor Done!");
    store.dispatch("setAppDoneLoading");
    return response;
  },
  error => {
    store.dispatch("setAppDoneLoading");
    return Promise.reject(error);
  }
);

export default {
  root: process.env.VUE_APP_API_URL
};
