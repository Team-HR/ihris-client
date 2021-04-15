import StaffManagement from "../views/hr/StaffManagement.vue"
const routes = [
  {
    path: "/staff-management",
    name: "staff-management",
    component: StaffManagement,
    meta: {
      title: "Staff Management",
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
