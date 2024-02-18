/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Router views */

/* Main application */
import Home from "../views/MainAppViews/Home.vue";
import Gallery from "../views/MainAppViews/Gallery.vue";
import OurWorks from "../views/MainAppViews/OurWorks.vue";
import Machines from "../views/MainAppViews/Machines.vue";
import MachineDetail from "../views/MainAppViews/MachineDetail.vue";
import ContactUs from "../views/MainAppViews/ContactUs.vue";
import Career from "../views/MainAppViews/Career.vue";
import CareerDetail from "../views/MainAppViews/CareerDetail.vue";
import NotFound from "../views/MainAppViews/NotFound.vue";
// import AboutUs from "../views/MainAppViews/AboutUs.vue";

/* Admin application */
// Main pages
import Admin from "../views/AdminViews/Admin.vue";
import AdminDashboard from "../views/AdminViews/AdminDashboard.vue";
import AdminParagraph from "../views/AdminViews/AdminParagraph.vue";
import AdminGalleryManagement from "../views/AdminViews/AdminGalleryManagement.vue";
import AdminOurFilms from "../views/AdminViews/AdminOurFilms.vue";
import AdminMachines from "../views/AdminViews/AdminMachines.vue";
import AdminCareer from "../views/AdminViews/AdminCareer.vue";
import AdminAdminManagement from "../views/AdminViews/AdminAdminManagement.vue";
// import AdminAboutUs from "../views/AdminViews/AdminAboutUs.vue";
// import AdminBookings from "../views/AdminViews/AdminBookings.vue";
// import AdminStatistics from "../views/AdminViews/AdminStatistics.vue";

// Creation pages
import CreateParagraph from "../components/AdminComponents/CreateParagraph.vue";
import CreateFilm from "../components/AdminComponents/CreateFilm.vue";
import CreateMachine from "../components/AdminComponents/CreateMachine.vue";
import CreateJob from "../components/AdminComponents/CreateJob.vue";
import CreateAdmin from "../components/AdminComponents/CreateAdmin.vue";
// import CreateAboutus from "../components/AdminComponents/CreateAboutus.vue";

// Modification pages
import ModifyMachine from "../components/AdminComponents/ModifyMachine.vue";
import ModifyParagraph from "../components/AdminComponents/ModifyParagraph.vue";
import ModifyJob from "../components/AdminComponents/ModifyJob.vue";
import ModifyFilm from "../components/AdminComponents/ModifyFilm.vue";
// import ModifyAboutus from "../components/AdminComponents/ModifyAboutus.vue";

// Machines gallery
import MachineGallery from "../components/AdminComponents/MachineGallery.vue";

// Services
import authService from "@/services/authService";
import i18n from "@/main";

/* Router paths */
const routes = [
  /* MAIN APPLICATION */

  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/galeria",
    name: "Gallery",
    component: Gallery,
    meta: { isMainApp: true, isAdminApp: false },
  },
  // {
  //   path: "/bemutatkozas",
  //   name: "AboutUs",
  //   component: AboutUs,
  //   meta: { isMainApp: true, isAdminApp: false },
  // },
  {
    path: "/munkaink",
    name: "OurWorks",
    component: OurWorks,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/berelheto-gepeink",
    name: "Machines",
    component: Machines,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/berelheto-gepeink/:id",
    name: "MachineDetail",
    component: MachineDetail,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/elerhetoseg",
    name: "ContactUs",
    component: ContactUs,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/karrier",
    name: "Career",
    component: Career,
    meta: { isMainApp: true, isAdminApp: false },
  },
  {
    path: "/karrier/:id",
    name: "CareerDetail",
    component: CareerDetail,
    meta: { isMainApp: true, isAdminApp: false },
  },
  // 404 Page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { isMainApp: true, isAdminApp: false },
  },
  // Redirect from old application's landing
  {
    path: "/index.php/",
    redirect: "/",
  },
  {
    path: "/index.php/:lang/",
    redirect: "/",
  },
  /* ADMIN APPLICATION */
  // Login Page
  {
    path: "/admin",
    name: "Bejelentkezés",
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
    name: "Irányítópult",
    component: AdminDashboard,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  // {
  //   path: "/admin/bookings",
  //   name: "Megrendelések",
  //   component: AdminBookings,
  //   meta: {
  //     isMainApp: false,
  //     isAdminApp: true,
  //     requireAuth: true,
  //   },
  // },
  // {
  //   path: "/admin/statistics",
  //   name: "Statisztika",
  //   component: AdminStatistics,
  //   meta: {
  //     isMainApp: false,
  //     isAdminApp: true,
  //     requireAuth: true,
  //   },
  // },
  {
    path: "/admin/paragraph-management",
    name: "Paragrafus menedzsment",
    component: AdminParagraph,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/gallery-management",
    name: "Galéria menedzsment",
    component: AdminGalleryManagement,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  // {
  //   path: "/admin/aboutus-management",
  //   name: "Bemutatkozás menedzsment",
  //   component: AdminAboutUs,
  //   meta: {
  //     isMainApp: false,
  //     isAdminApp: true,
  //     requireAuth: true,
  //   },
  // },
  {
    path: "/admin/ourfilms-management",
    name: "Munkáink menedzsment",
    component: AdminOurFilms,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/machines-management",
    name: "Gépeink menedzsment",
    component: AdminMachines,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/career-management",
    name: "Karrier menedzsment",
    component: AdminCareer,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/admin-management",
    name: "Adminisztrátor menedzsment",
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
    name: "Új paragrafus",
    component: CreateParagraph,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  // {
  //   path: "/admin/aboutus-management/createaboutus",
  //   name: "Új bemutatkozás elem",
  //   component: CreateAboutus,
  //   meta: {
  //     isMainApp: false,
  //     isAdminApp: true,
  //     requireAuth: true,
  //   },
  // },
  {
    path: "/admin/ourfilms-management/createfilm",
    name: "Új film",
    component: CreateFilm,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/machines-management/createmachine",
    name: "Új nehézgép",
    component: CreateMachine,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/career-management/createjob",
    name: "Új állás",
    component: CreateJob,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/admin-management/createadmin",
    name: "Új adminisztrátor",
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
    name: "Nehézgép módosítás",
    component: ModifyMachine,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/paragraph-management/:id",
    name: "Paragrafus módosítás",
    component: ModifyParagraph,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  // {
  //   path: "/admin/aboutus-management/:id",
  //   name: "Bemutatkozás elem módosítás",
  //   component: ModifyAboutus,
  //   meta: {
  //     isMainApp: false,
  //     isAdminApp: true,
  //     requireAuth: true,
  //   },
  // },
  {
    path: "/admin/career-management/:id",
    name: "Állás módosítás",
    component: ModifyJob,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/ourfilms-management/:id",
    name: "Film módosítás",
    component: ModifyFilm,
    meta: {
      isMainApp: false,
      isAdminApp: true,
      requireAuth: true,
    },
  },
  {
    path: "/admin/machines-management/:id/gallery",
    name: "Nehézgép galéria",
    component: MachineGallery,
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

// Cím beállítása minden oldalnak
router.beforeEach((to, from, next) => {
  if (to.meta.isMainApp) {
    const pageTitle = i18n.global.t(`titles.${to.name}`) || "ManitouPeti";
    document.title = `ManitouPeti - ${pageTitle}`;
  } else if (to.meta.isAdminLogin || to.meta.isAdminApp) {
    document.title = `ManitouPeti - ${to.name}`;
  } else {
    document.title = "ManitouPeti";
  }
  next();
});

export default router;
