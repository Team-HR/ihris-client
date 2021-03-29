import Vue from "vue";

import auth from "@websanova/vue-auth/src/index.js";
import authBearer from "@websanova/vue-auth/drivers/auth/bearer.js";
import httpAxios from "@websanova/vue-auth/drivers/http/axios.1.x.js";
// import httpVueResource from "@websanova/vue-auth/drivers/http/vue-resource.1.x.js";
import routerVueRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x.js";

Vue.use(auth, {
  auth: authBearer,
  http: httpAxios, // Axios
  //   http: httpVueResource, // Vue Resource
  router: routerVueRouter,
  rolesKey: "roles",
  rememberKey: "auth_remember",
  staySignedInKey: "auth_stay_signed_in",
  tokenDefaultKey: "auth_token_default",
  tokenImpersonateKey: "auth_token_impersonate",
  stores: ["storage", "cookie"],

  cookie: {
    Path: "/",
    Domain: null,
    Secure: true,
    Expires: 12096e5,
    SameSite: "None"
  },

  // Redirects

  authRedirect: { path: "/login" },
  forbiddenRedirect: { path: "/403" },
  notFoundRedirect: { path: "/404" },

  // Http
  registerData: {
    url: "auth/register",
    method: "POST",
    redirect: "/login",
    autoLogin: false
  },
  loginData: {
    url: "auth/login",
    method: "POST",
    redirect: "/assessments",
    fetchUser: true,
    staySignedIn: true
  },
  logoutData: {
    url: "auth/logout",
    method: "POST",
    redirect: "/login",
    makeRequest: false
  },
  fetchData: { url: "auth/user", method: "GET", enabled: true },
  refreshData: {
    url: "auth/refresh",
    method: "GET",
    enabled: true,
    interval: 30
  }
});
