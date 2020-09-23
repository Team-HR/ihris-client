import Employees from "../views//Employees";

const routes = [
  {
    path: "/employees",
    name: "employees",
    component: Employees,
    meta: {
      title: "Employees",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  }
];

export default routes;
