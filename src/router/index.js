import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const DEFAULT_TITLE = "HRMDS";

import auth from "./auth";
import site from "./site";
import appointment from "./appointment";
import accounts_management from "./accounts_management";
import errors from "./errors";
import plantilla_jocontract from "./plantilla_jocontract";
import payroll from "./payroll";
import tlb from "./tlb";

const routes = [].concat(
  auth,
  site,
  errors,
  accounts_management,
  appointment,
  plantilla_jocontract,
  payroll,
  tlb
);

Vue.router = new VueRouter({
  hashbang: false,
  // history: true,
  mode: "history",
  base: __dirname,
  routes: routes
});

Vue.router.afterEach(to => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default Vue.router;
