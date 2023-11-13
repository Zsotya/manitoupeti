import { createStore } from "vuex";
const themePreference = "themePreference";
const languagePreference = "languagePreference";

export default createStore({
  state: {
    darkMode: localStorage.getItem(themePreference) === "true",
    language: localStorage.getItem(languagePreference) || "hu",
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem(themePreference, state.darkMode);
    },
    setLanguage(state, language) {
      state.language = language;
      localStorage.setItem(languagePreference, language);
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
    setLanguage({ commit }, language) {
      commit("setLanguage", language);
    },
  },
  getters: {
    isDarkMode: (state) => state.darkMode,
    currentLanguage: (state) => state.language,
  },
});
