import Error403 from "../pages/error/403.vue";
import Error404 from "../pages/error/404.vue";

const routes = [
  {
    path: "/403",
    name: "error-403",
    component: Error403
  },
  {
    path: "/404",
    name: "error-404",
    component: Error404
  }
];

export default routes;
