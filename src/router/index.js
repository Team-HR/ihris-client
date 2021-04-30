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
import comp from "./competency";
import assessments from "./assessments";
import office_staff_management from "./office_staff_management.js";
import departments from "./departments.js";

const routes = [
    { path: "*", redirect: "/404" },
    {
        path: "/cores",
        name: "cores",
        component: Cores,
        meta: {
            // auth: true
            auth: {
                roles: ["sys_admin"],
                redirect: "/login",
                notFoundRedirect: "/404",
                forbiddenRedirect: "/403"
            }
        }
    },
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            auth: true
        }
    },
].concat(auth, errors, accs, emps, comp, assessments, office_staff_management, departments);

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