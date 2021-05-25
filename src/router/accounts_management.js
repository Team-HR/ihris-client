import UserAccounts from "../views/accounts_management/UserAccounts";
import UserGroups from "../views/accounts_management/UserGroups";

const routes = [
  {
    path: "/user-accounts",
    name: "user-accounts",
    component: UserAccounts,
    meta: {
      title: "User Accounts",
      auth: {
        roles: ["sys_admin"],
        redirect: "/login",
        notFoundRedirect: "/404",
        forbiddenRedirect: "/403"
      }
    }
  },
  {
    path: "/user-groups",
    name: "user-groups",
    component: UserGroups,
    meta: {
      title: "User Groups",
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
