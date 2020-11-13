import Vue from "vue";
import VueRouter from "vue-router";
import Cores from "../views/Cores.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const DEFAULT_TITLE = "IHRIS";

import auth from "./auth";
import errors from "./errors";
import accs from "./accounts_management";
import emps from "./employees";
import talent_assessment from "./talent_assessment";

const routes = [
  { path: "*", redirect: "/404" },
  {
    path: "/cores",
    name: "cores",
    component: Cores,
    meta: {
      auth: true
    }
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth: true
    }
  }
].concat(auth, errors, accs, emps, talent_assessment);

Vue.router = new VueRouter({
  hashbang: false,
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
