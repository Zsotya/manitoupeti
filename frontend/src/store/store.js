import { createStore } from "vuex";

export default createStore({
  state: {
    darkMode: false,
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit("toggleDarkMode");
    },
  },
  getters: {
    isDarkMode: (state) => state.darkMode,
  },
});
