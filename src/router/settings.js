import Settings from "../views/Settings.vue";
import ChangePassword from "../views/settings/ChangePassword.vue";

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
  },
  {
    path: "/settings-change-password",
    name: "change-password",
    component: ChangePassword,
    meta: {
      title: "Change Password",
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
