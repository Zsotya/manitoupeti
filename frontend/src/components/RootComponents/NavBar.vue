<template>
  <nav :class="{ 'dark-mode': darkMode }">
    <button class="hamburger-icon" @click="toggleMobileMenu">
      <i class="fas fa-bars" style="font-size: 3em"></i>
    </button>

    <!-- MOBIL MENÜ -->
    <ul class="mobile-menu" :class="{ active: mobileMenuOpen }">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="true"
        @click="closeMobileMenu"
      >
        <li>{{ $t(route.label) }}</li>
      </router-link>
      <li class="buttons">
        <div class="onoffswitch">
          <input
            type="checkbox"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch1"
            tabindex="0"
            :checked="$store.getters.currentLanguage === 'en'"
            @change="
              $store.dispatch(
                'setLanguage',
                $store.getters.currentLanguage === 'hu' ? 'en' : 'hu'
              )
            "
            @click="$i18n.locale = $i18n.locale === 'hu' ? 'en' : 'hu'"
          />
          <label class="onoffswitch-label" for="myonoffswitch1">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>
        <div class="theme-toggle">
          <button
            :class="{ 'dark-button': true, active: darkMode }"
            @click="toggleDarkMode"
          >
            <span class="slider" :class="{ 'no-close': true }">
              <i
                v-if="!darkMode"
                class="fas fa-sun"
                :class="{ 'no-close': true }"
              ></i>
              <i
                v-if="darkMode"
                class="fas fa-moon"
                :class="{ 'no-close': true }"
              ></i
            ></span>
          </button>
        </div>
      </li>
    </ul>

    <!-- DESKTOP MENÜ -->
    <ul class="desktop-menu">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="true"
      >
        <li>{{ $t(route.label) }}</li>
      </router-link>
      <li class="buttons">
        <div class="onoffswitch">
          <input
            type="checkbox"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch2"
            tabindex="0"
            :checked="$store.getters.currentLanguage === 'en'"
            @change="
              $store.dispatch(
                'setLanguage',
                $store.getters.currentLanguage === 'hu' ? 'en' : 'hu'
              )
            "
            @click="$i18n.locale = $i18n.locale === 'hu' ? 'en' : 'hu'"
          />
          <label class="onoffswitch-label" for="myonoffswitch2">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>
        <div class="theme-toggle">
          <button
            :class="{ 'dark-button': true, active: darkMode }"
            @click="toggleDarkMode"
          >
            <span class="slider">
              <i v-if="!darkMode" class="fas fa-sun"></i>
              <i v-if="darkMode" class="fas fa-moon"></i
            ></span>
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const store = useStore();

const routes = [
  { path: "/", label: "homeLabel" },
  { path: "/bemutatkozas", label: "aboutLabel" },
  { path: "/munkaink", label: "ourWorksLabel" },
  { path: "/berelheto-gepeink", label: "machinesLabel" },
  { path: "/elerhetoseg", label: "contactUsLabel" },
  { path: "/karrier", label: "careerLabel" },
];

// Dark mode

const darkMode = computed(() => store.getters.isDarkMode);
const toggleDarkMode = () => {
  store.dispatch("toggleDarkMode");
};

/* Alapértelmezetten bezárva */
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Bezárja a menüt, ha szélesebb lenne a viewport (pl. mobil elforgatás aktív menü közben)
const closeMobileMenuOnResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false;
  }
};

const resizeListener = () => {
  closeMobileMenuOnResize();
};

onMounted(() => {
  // Oldal átméretezésének figyelése
  window.addEventListener("resize", resizeListener);
  closeMobileMenuOnResize();

  // A menün kívüli kattintások figyelése
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  // Oldal átméretezésének figyelésének törlése
  window.removeEventListener("resize", resizeListener);

  // A menün kívüli kattintások figyelésének törlése
  document.removeEventListener("click", handleDocumentClick);
});

// Menün kívüli kattintás esetén menü bezárása
const handleDocumentClick = (event) => {
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const switchButtons = document.querySelector(".buttons");

  // Gombok meghatározása, melyeken kívül bárhova kattintva a menü bezár
  if (
    mobileMenu &&
    hamburgerIcon &&
    !mobileMenu.contains(event.target) &&
    !hamburgerIcon.contains(event.target) &&
    !switchButtons.contains(event.target) &&
    !event.target.classList.contains("no-close")
  ) {
    closeMobileMenu();
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  right: 12rem;
  top: 20px;
  z-index: 2;
}

ul {
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  background-color: rgba(230, 247, 255, 0.7);
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid rgb(19, 151, 217);
  transition: background-color 0.5s, border 0.5s;
}

li {
  text-align: center;
  margin: 0 0.2rem;
  line-height: 70px;
  position: relative;
}

.router-link-active,
a:hover {
  background: rgba(0, 90, 187, 0.8);
  color: #ffffff;
}

a:hover {
  background: rgba(0, 90, 187, 0.8);
  color: #ffffff;
  transition: 0.3s ease;
}

li.active {
  background: white;
  color: black;
}

a {
  text-decoration: none;
  color: black;
  padding: 0px 20px;
  background-color: rgba(230, 247, 255, 0.7);
  transition: 0.3s ease-in-out;
}

.buttons {
  text-decoration: none;
  color: white;
  padding: 2px 10px 0px 0px;
  background-color: rgba(230, 247, 255, 0.7);
  transition: 0.3s ease-in-out;
  margin: 0px;
}

.onoffswitch {
  position: relative;
  width: 70px;
}
.onoffswitch-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 20px;
}
.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 30px;
  padding: 0;
  line-height: 30px;
  font-size: 14px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  box-sizing: border-box;
}
.onoffswitch-inner:before {
  content: "";
  padding-left: 10px;
  text-align: left;
  background-image: url("@/assets/american-flag.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #000000;
}
.onoffswitch-inner:after {
  content: "";
  padding-right: 10px;
  background-image: url("@/assets/hungarian-flag.png");
  background-size: 100px 60px;
  background-repeat: no-repeat;
  background-position: center;
  text-shadow: 2px 2px 2px rgb(255, 255, 255);
  color: black;
  text-align: right;
  font-weight: bold;
}
.onoffswitch-switch {
  display: block;
  width: 30px;
  margin: 2px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 36px;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}

.theme-toggle {
  line-height: 22px;
  position: relative;
}

.dark-button {
  position: relative;
  background-color: #eee;
  color: #333;
  border: 1px solid #c3c3c3;
  border-radius: 20px;
  width: 68px;
  height: 30px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.5s;
}

.dark-button:hover {
  background-color: #bbbbbb;
}

.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1px;
  width: 29px;
  height: 29px;
  border: 2px black solid;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.5s;
}

.dark-button.active {
  background-color: #323232;
  color: #fff;
  border: 1px solid #494949;
  transition: background-color 0.5s;
}

.dark-button.active:hover {
  background-color: #727272;
}

.dark-button.active .slider {
  left: 38px;
  border: 2px white solid;
  background-color: black;
  transition: 0.5s;
}

.dark-button i {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  line-height: 0;
}

.dark-button i.fas.fa-moon {
  color: white;
}

/* Mobil menü stílus */

.mobile-menu {
  display: none; /* 768px+ képernyőknél ne jelenjen meg */
  list-style: none;
  flex-direction: column;
  position: absolute;
  top: 0px;
  left: 0;
  width: 30%;
  min-width: 160px;
  background-color: rgba(0, 0, 0, 0.338);
  border: 1px solid rgb(19, 151, 217);
  border-radius: 0px;
  overflow: hidden;
}

.mobile-menu.active {
  display: flex;
}

.hamburger-icon {
  display: none; /* 768px+ képernyőknél ne jelenjen meg */
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding: 10px 0px 0px 10px;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  nav {
    top: 0;
    right: 0;
    width: 100%;
  }

  ul {
    justify-content: center;
    border-radius: 0px;
  }

  a {
    width: 100%;
    padding: 0px;
  }

  li {
    margin: 0;
  }
}

/* Tablet, mobil nézet */
@media screen and (max-width: 768px) {
  .hamburger-icon {
    display: flex;
  }

  .desktop-menu {
    display: none;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
}

/* Dark mode */
.dark-mode ul {
  background-color: rgba(0, 0, 0, 0.45);
  border: 1px solid red;
}

.dark-mode a {
  background-color: rgba(0, 0, 0, 0.45);
  color: white;
}

.dark-mode .router-link-active,
.dark-mode a:hover {
  background-color: #efefef;
  color: black;
}

.dark-mode .buttons {
  background-color: rgba(0, 0, 0, 0.45);
}
</style>
