import Assessments from "../views/assessments/Index"
import Assessment from "../views/assessments/Assessment"
import Personnel from "../views/assessments/Personnel"
import StaffManagement from "../views/hr/StaffManagement.vue"

const routes = [
  {
    path: "/assessments",
    name: "assessments",
    component: Assessments,
    meta: {
      title: "Assessments",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/assessments/:id",
    name: "assessment",
    component: Assessment,
    meta: {
      title: "Assessment",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/assessments/personnel/:id",
    name: "assessment-personnel",
    component: Personnel,
    meta: {
      title: "Edit Personnel",
      auth: {
        roles: ["emp"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
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
