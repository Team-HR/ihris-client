import Index from "../pages/plantilla_jocontract/Index";

const routes = [
  {
    path: "/plantilla-jow-contract",
    name: "plantilla_jocontract",
    component: Index,
    meta: {
      title: "Plantilla/JOW Contract",
      auth: true
    }
  }
];

export default routes;
