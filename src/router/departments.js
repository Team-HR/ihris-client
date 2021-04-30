import Index from "../views/hr/Departments/Index"

const routes = [
  {
    path: "/departments",
    name: "departments",
    component: Index,
    meta: {
      title: "Departments",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
];

export default routes;
