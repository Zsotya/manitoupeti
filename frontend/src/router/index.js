/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Router views */
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import OurWorks from "../views/OurWorks.vue";
import Machines from "../views/Machines.vue";
import ContactUs from "../views/ContactUs.vue";
import Career from "../views/Career.vue";
import Admin from "../views/Admin.vue";

/* Router paths */
const routes = [
  { path: "/", component: Home, meta: { showNavbar: true, showFooter: true } },
  {
    path: "/bemutatkozas",
    component: AboutUs,
    meta: { showNavbar: true, showFooter: true },
  },
  {
    path: "/munkaink",
    component: OurWorks,
    meta: { showNavbar: true, showFooter: true },
  },
  {
    path: "/berelheto-gepeink",
    component: Machines,
    meta: { showNavbar: true, showFooter: true },
  },
  {
    path: "/elerhetoseg",
    component: ContactUs,
    meta: { showNavbar: true, showFooter: true },
  },
  {
    path: "/karrier",
    component: Career,
    meta: { showNavbar: true, showFooter: true },
  },
  {
    path: "/admin",
    component: Admin,
    meta: { showNavbar: false, showFooter: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
