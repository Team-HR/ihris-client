import Index from "../views/talent_assessment/Index";
import AddEdit from "../views/talent_assessment/AddEdit";
import QuestionnaireEditor from "../views/talent_assessment/QuestionnaireEditor";

const routes = [
  {
    path: "/talent-assessment",
    name: "talent-assessment",
    component: Index,
    meta: {
      title: "Talent Assessment",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/talent-assessment/new",
    name: "talent-assessment-add",
    component: AddEdit,
    meta: {
      title: "Add New Survey",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/talent-assessment/questionnaire-editor/:id",
    name: "talent-assessment-questionnaire-editor",
    component: QuestionnaireEditor,
    meta: {
      title: "Edit Questionnaire",
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
