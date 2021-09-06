import Setup from "../views/sys_admin_setup/Setup";
import Register from "../views/sys_admin_setup/accounts/Register";
// Competency Setup
import CompetencySetup from "../views/sys_admin_setup/competency_setup/CompetencySetup"
import OfficeOverview from "../views/sys_admin_setup/competency_setup/OfficeOverview"
const routes = [
  {
    path: "/sys-admin-setup",
    name: "sys_admin_setup",
    component: Setup,
    meta: {
      title: "System Admin Setup",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/employee-registration",
    name: "register",
    component: Register,
    meta: {
      title: "Register an Employee",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/competency-setup",
    name: "competency-setup",
    component: CompetencySetup,
    meta: {
      title: "Competency Setup",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/office-overview",
    name: "office-overview",
    component: OfficeOverview,
    meta: {
      title: "Office Overview",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        // notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
];

export default routes;
