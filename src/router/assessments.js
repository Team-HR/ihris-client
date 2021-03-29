import Assessments from "../views/assessments/Index"
import Assessment from "../views/assessments/Assessment"
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
  }
];

export default routes;
