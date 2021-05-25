import Index from "../views/hr/Departments/Index"
import Offices from "../views/hr/Departments/Offices"
import OfficesAddEdit from "../views//hr/Departments/OfficesAddEdit"
import Supervisory from "../views/hr/Departments/Supervisory"
import SupervisoryAddEdit from "../views/hr/Departments/SupervisoryAddEdit"

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
  {
    path: "/department/offices/:id",
    name: "offices",
    component: Offices,
    meta: {
      title: "Offices",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/department/offices/:department_id/supervisory/:id",
    name: "supervisory",
    component: Supervisory,
    meta: {
      title: "Supervisory",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/department/offices/:department_id/supervisory/:id/new",
    name: "supervisory-new",
    component: SupervisoryAddEdit,
    meta: {
      title: "Supervisory-New",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/department/offices/:department_id/new",
    name: "office-new",
    component: OfficesAddEdit,
    meta: {
      title: "Office-New",
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
