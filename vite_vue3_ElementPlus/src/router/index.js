import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/Layout.vue"),
    redirect: "/detail",
    children: [
      {
        path: "/detail",
        name: "detail",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Detail.vue"),
      },
      {
        path: "/statistics",
        name: "statistics",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Statistics.vue"),
      },
    ],
  },
  {
    path: "/rbac",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/RbacLayout.vue"),
    redirect: "/userAdmin",
    children: [
      {
        path: "/groupAdmin",
        name: "groupAdmin",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/rbac/admin/GroupAdmin.vue"
          ),
      },
      {
        path: "/userAdmin",
        name: "userAdmin",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/rbac/admin/UserAdmin.vue"
          ),
      },
      {
        path: "/roleAdmin",
        name: "roleAdmin",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/rbac/admin/RoleAdmin.vue"
          ),
      },
      {
        path: "/roleAssign",
        name: "roleAssign",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/rbac/assign/RoleAssign.vue"
          ),
      },
      {
        path: "/permissionAssign",
        name: "permissionAssign",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/rbac/assign/PermissionAssign.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
