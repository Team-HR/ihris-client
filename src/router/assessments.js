import Assessments from "../views/assessments/Index"
import Assessment from "../views/assessments/Assessment"
import Personnels from "../views/assessments/Personnels"
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
    path: "/assessments/personnels/:id",
    name: "assessment-personnels",
    component: Personnels,
    meta: {
      title: "Edit Personnels",
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