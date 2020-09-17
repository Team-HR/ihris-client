import Index from "../pages/appointment/Index";

const routes = [
  {
    path: "/appointment",
    name: "appointment",
    component: Index,
    meta: {
      title: "Appointment",
      auth: true
    }
  }
];

export default routes;
