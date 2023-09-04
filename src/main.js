// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Bemutatkozás from "./views/AboutUs.vue";
import Munkáink from "./views/OurWorks.vue";
import BérelhetőGépeink from "./views/Machines.vue";
import Elérhetőség from "./views/ContactUs.vue";
import Karrier from "./views/Career.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/bemutatkozas", component: Bemutatkozás },
  { path: "/munkaink", component: Munkáink },
  { path: "/berelheto-gepeink", component: BérelhetőGépeink },
  { path: "/elerhetoseg", component: Elérhetőség },
  { path: "/karrier", component: Karrier },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
