import Login from "../pages/auth/Login.vue";

const routes = [
  {
    path: "/login",
    name: "auth-login",
    component: Login,
    meta: {
      auth: false
    }
  }
];

export default routes;
