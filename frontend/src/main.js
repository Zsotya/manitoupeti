import { createApp } from "vue";
import App from "./App.vue";
import "./reset.css";

/* Vuex */
import store from "./store/store";

/* Vue Router */
import router from "./router";

/* i18n */
import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import hu from "./locales/hu.json";

const languagePreference = "languagePreference";
const savedLanguage = localStorage.getItem(languagePreference);

const i18n = createI18n({
  locale: savedLanguage || "hu",
  fallbackLocale: "en",
  messages: {
    hu: hu,
    en: en,
  },
});

/* Application creation */
const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.mount("#app");

export default i18n;
