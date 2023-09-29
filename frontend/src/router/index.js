/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Router views */
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import OurWorks from "../views/OurWorks.vue";
import Machines from "../views/Machines.vue";
import ContactUs from "../views/ContactUs.vue";
import Career from "../views/Career.vue";

/* Router paths */
const routes = [
  { path: "/", component: Home },
  { path: "/bemutatkozas", component: AboutUs },
  { path: "/munkaink", component: OurWorks },
  { path: "/berelheto-gepeink", component: Machines },
  { path: "/elerhetoseg", component: ContactUs },
  { path: "/karrier", component: Career },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
