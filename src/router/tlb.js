import Index from "../pages/tlb/Index";

const routes = [
  {
    path: "/tlb",
    name: "tlb",
    component: Index,
    meta: {
      title: "TLB",
      auth: true
    }
  }
];

export default routes;
