import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sign-in",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      // {
      //   path: "/accident",
      //   name: "accident",
      //   component: () => import("@/views/accident/pages.vue"),
      //   meta: {
      //     pageTitle: "Accident",
      //     breadcrumbs: ["Accident"],
      //   },
      // },
      {
        path: "/accident/detail",
        name: "accident-detail",
        component: () => import("@/views/accident/Part/Detail.vue"),
        meta: {
          pageTitle: "Accident Detail",
          breadcrumbs: ["Accident", "Detail"],
        },
      },
      {
        path: "/msa",
        name: "msa",
        component: () => import("@/views/msa/pages.vue"),
        meta: {
          pageTitle: "MSA",
          breadcrumbs: ["MSA"],
        },
      },
      {
        path: "/msa/add",
        name: "msa_add",
        component: () => import("@/views/msa/Part/Form.vue"),
        meta: {
          pageTitle: "Form Add PKS",
          breadcrumbs: ["PKS","Form"],
        },
      },
      {
        path: "/msa/add_detail/:id",
        name: "msa_add_detail",
        component: () => import("@/views/msa/Part/FormMSA.vue"),
        meta: {
          pageTitle: "Form Add MSA",
          breadcrumbs: ["MSA","Form"],
        },
      },
      {
        path: "/license",
        name: "license",
        component: () => import("@/views/license/pages.vue"),
        meta: {
          pageTitle: "License",
          breadcrumbs: ["License"],
        },
      },
      {
        path: "/license/add",
        name: "license_add",
        component: () => import("@/views/license/Part/Form.vue"),
        meta: {
          pageTitle: "Form Add License",
          breadcrumbs: ["License","Form"],
        },
      },
      {
        path: "/license/form/:id",
        name: "license_form",
        component: () => import("@/views/license/Part/Form.vue"),
        meta: {
          pageTitle: "Form Add License",
          breadcrumbs: ["License","Form"],
        },
      },
      {
        path: "/vendor",
        name: "vendor",
        component:  () => import("@/views/vendor/pages.vue"),
        meta: {
          pageTitle: "Vendor",
          breadcrumbs: ["Vendor"],
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/pages.vue"),
        meta: {
          pageTitle: "User",
          breadcrumbs: ["User"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  // authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
});

export default router;
