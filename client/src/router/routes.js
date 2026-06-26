const routes = [
  {
    path: "/",
    redirect: { name: "auth" },
    meta: {
      auth: true,
    },
  },
  {
    path: "/charts",
    name: "charts",
    component: () => import("pages/financial-service/charts.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/strategy",
    name: "strategy",
    component: () => import("pages/financial-service/flowchart.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/history",
    component: () => import("pages/financial-service/history.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/profile",
    component: () => import("pages/account/profile.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("pages/account/statistics.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/statistics/users",
    name: "statisticsUsers",
    component: () => import("pages/statistics/usersInfo.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },
  {
    path: "/statistics/algorithms",
    name: "statisticsAlgorithms",
    component: () => import("pages/statistics/algos.view.vue"),
    meta: {
      layout: "mainLayout",
      auth: true,
    },
  },

  {
    path: "/auth",
    name: "auth",
    redirect: { name: "login" },
    component: () => import("pages/auth/root.vue"),
    meta: {
      layout: "authLayout",
      auth: false,
    },
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/auth/login.vue"),
        meta: {
          layout: "authLayout",
        },
      },
      {
        path: "sign-up",
        name: "signUp",
        component: () => import("pages/auth/sign-up.vue"),
        meta: {
          layout: "authLayout",
        },
      },
      {
        path: "forget-password",
        name: "forgetPassword",
        component: () => import("pages/auth/forget-password.vue"),
        meta: {
          layout: "authLayout",
        },
      },
      {
        path: "new-password",
        name: "newPassword",
        component: () => import("pages/auth/new-password.vue"),
        meta: {
          layout: "authLayout",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: {
      layout: "mainLayout",
    },
  },
];

export default routes;
