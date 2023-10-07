/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Router views */
import Home from "../views/MainAppViews/Home.vue";
import AboutUs from "../views/MainAppViews/AboutUs.vue";
import OurWorks from "../views/MainAppViews/OurWorks.vue";
import Machines from "../views/MainAppViews/Machines.vue";
import ContactUs from "../views/MainAppViews/ContactUs.vue";
import Career from "../views/MainAppViews/Career.vue";
import Admin from "../views/AdminViews/Admin.vue";
import AdminDashboard from "../views/AdminViews/AdminDashboard.vue";
import AdminStatistics from "../views/AdminViews/AdminStatistics.vue";
import AdminParagraph from "../views/AdminViews/AdminParagraph.vue";
import AdminOurFilms from "../views/AdminViews/AdminOurFilms.vue";
import AdminMachines from "../views/AdminViews/AdminMachines.vue";
import AdminCareer from "../views/AdminViews/AdminCareer.vue";
import AdminAdminManagement from "../views/AdminViews/AdminAdminManagement.vue";
import authService from "@/services/authService";

/* Router paths */
const routes = [
  {
    path: "/",
    component: Home,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/bemutatkozas",
    component: AboutUs,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/munkaink",
    component: OurWorks,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/berelheto-gepeink",
    component: Machines,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/elerhetoseg",
    component: ContactUs,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/karrier",
    component: Career,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/admin",
    component: Admin,
    meta: { isMainApp: false, isAdminApp: false, isAdminLogin: true },
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (token) {
        next("/admin/dashboard"); // Ha van token, automatikusan a ../admin/dashboard oldalra kerül
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/statistics",
    component: AdminStatistics,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/paragraph-management",
    component: AdminParagraph,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/ourfilms-management",
    component: AdminOurFilms,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/machines-management",
    component: AdminMachines,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/career-management",
    component: AdminCareer,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/admin-management",
    component: AdminAdminManagement,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/admin");
    } else if (authService.isTokenExpired(token)) {
      authService.logoutUser();
      next("/admin");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
