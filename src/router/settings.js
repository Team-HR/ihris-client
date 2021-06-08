import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      title: "Settings",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  }
];

export default routes;
