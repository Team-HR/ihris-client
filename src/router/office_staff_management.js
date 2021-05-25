import Index from "../views/hr/OfficeStaffManagement/Index.vue"
import OfficeStaffManagement from "../views/hr/OfficeStaffManagement/OfficeStaffManagement.vue"
const routes = [
{
    path: "/office-staff-management",
    name: "offices-staff-management",
    component: Index,
    meta: {
      title: "Offices Staff Management",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/office-staff-management/:id",
    name: "office-staff-management",
    component: OfficeStaffManagement,
    meta: {
      title: "Office Staff Management",
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
