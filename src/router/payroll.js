import Index from "../pages/payroll/Index";

const routes = [
  {
    path: "/payroll",
    name: "payroll",
    component: Index,
    meta: {
      title: "Payroll",
      auth: true
    }
  }
];

export default routes;
