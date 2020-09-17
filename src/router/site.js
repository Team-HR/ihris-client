import Dashboard from "../pages/site/Dashboard.vue";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      auth: true
    }
  }
];

export default routes;
