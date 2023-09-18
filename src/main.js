import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import "./reset.css";

import Home from "./views/Home.vue";
import Bemutatkozás from "./views/AboutUs.vue";
import Munkáink from "./views/OurWorks.vue";
import BérelhetőGépeink from "./views/Machines.vue";
import Elérhetőség from "./views/ContactUs.vue";
import Karrier from "./views/Career.vue";

import en from "./locales/en.json";
import hu from "./locales/hu.json";

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

const i18n = createI18n({
  locale: "hu",
  fallbackLocale: "en",
  messages: {
    en,
    hu,
  },
});

const app = createApp(App);
app.use(router);
app.use(i18n);

app.mount("#app");
