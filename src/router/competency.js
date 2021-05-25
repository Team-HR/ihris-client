import Competency from "../views/Competency";

const routes = [
  {
    path: "/competency",
    name: "competency",
    component: Competency,
    meta: {
      title: "Competency Assessment",
      auth: {
        roles: ["emp","sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  }
];

export default routes;
