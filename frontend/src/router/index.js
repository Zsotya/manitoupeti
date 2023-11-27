/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Router views */

/* Main application */
import Home from "../views/MainAppViews/Home.vue";
import AboutUs from "../views/MainAppViews/AboutUs.vue";
import OurWorks from "../views/MainAppViews/OurWorks.vue";
import Machines from "../views/MainAppViews/Machines.vue";
import MachineDetail from "../views/MainAppViews/MachineDetail.vue";
import ContactUs from "../views/MainAppViews/ContactUs.vue";
import Career from "../views/MainAppViews/Career.vue";
import CareerDetail from "../views/MainAppViews/CareerDetail.vue";
import NotFound from "../views/MainAppViews/NotFound.vue";

/* Admin application */
// Main pages
import Admin from "../views/AdminViews/Admin.vue";
import AdminDashboard from "../views/AdminViews/AdminDashboard.vue";
import AdminBookings from "../views/AdminViews/AdminBookings.vue";
import AdminStatistics from "../views/AdminViews/AdminStatistics.vue";
import AdminParagraph from "../views/AdminViews/AdminParagraph.vue";
import AdminOurFilms from "../views/AdminViews/AdminOurFilms.vue";
import AdminMachines from "../views/AdminViews/AdminMachines.vue";
import AdminCareer from "../views/AdminViews/AdminCareer.vue";
import AdminAdminManagement from "../views/AdminViews/AdminAdminManagement.vue";
// Creation pages
import CreateParagraph from "../components/AdminComponents/CreateParagraph.vue";
import CreateFilm from "../components/AdminComponents/CreateFilm.vue";
import CreateMachine from "../components/AdminComponents/CreateMachine.vue";
import CreateJob from "../components/AdminComponents/CreateJob.vue";
import CreateAdmin from "../components/AdminComponents/CreateAdmin.vue";
// Modification pages
import ModifyMachine from "../components/AdminComponents/ModifyMachine.vue";
import ModifyParagraph from "../components/AdminComponents/ModifyParagraph.vue";

// Services
import authService from "@/services/authService";

/* Router paths */
const routes = [
  /* MAIN APPLICATION */

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
    path: "/berelheto-gepeink/:id",
    component: MachineDetail,
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
    path: "/karrier/:id",
    component: CareerDetail,
    meta: { isMainApp: true, isAdminApp: false },
  },
  // 404 Page
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: { isMainApp: true, isAdminApp: false },
  },
  /* ADMIN APPLICATION */
  // Login Page
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
  // Admin Main Pages
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
    path: "/admin/bookings",
    component: AdminBookings,
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
      requireMainAdmin: true,
    },
  },
  // Admin - Creation Pages
  {
    path: "/admin/paragraph-management/createparagraph",
    component: CreateParagraph,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/ourfilms-management/createfilm",
    component: CreateFilm,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/machines-management/createmachine",
    component: CreateMachine,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/career-management/createjob",
    component: CreateJob,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/admin-management/createadmin",
    component: CreateAdmin,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
      requireMainAdmin: true,
    },
  },
  // Admin - Modification Pages
  {
    path: "/admin/machines-management/:id",
    component: ModifyMachine,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/paragraph-management/:id",
    component: ModifyParagraph,
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
    const isMainAdmin = localStorage.getItem("isMainAdmin") === "true";
    if (!token) {
      next("/admin");
    } else if (authService.isTokenExpired(token)) {
      authService.logoutUser();
      next("/admin");
    } else if (to.meta.requireMainAdmin && !isMainAdmin) {
      next("/admin/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
