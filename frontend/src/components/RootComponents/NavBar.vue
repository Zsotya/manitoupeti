<template>
  <nav>
    <button class="hamburger-icon" @click="toggleMobileMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="3em"
        viewBox="0 0 448 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
    </button>

    <!-- MOBIL MENÜ -->
    <ul
      class="mobile-menu"
      :class="{ active: mobileMenuOpen }"
      @click="closeMobileMenu"
    >
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="true"
        @click="closeMobileMenu"
      >
        <li>{{ $t(route.label) }}</li>
      </router-link>
      <li class="lang-switch">
        <div class="onoffswitch">
          <input
            type="checkbox"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch1"
            tabindex="0"
            unchecked
            @click="$i18n.locale = $i18n.locale === 'hu' ? 'en' : 'hu'"
          />
          <label class="onoffswitch-label" for="myonoffswitch1">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
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
      <li class="lang-switch">
        <div class="onoffswitch">
          <input
            type="checkbox"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch2"
            tabindex="0"
            unchecked
            @click="$i18n.locale = $i18n.locale === 'hu' ? 'en' : 'hu'"
          />
          <label class="onoffswitch-label" for="myonoffswitch2">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const routes = [
  { path: "/", label: "homeLabel" },
  { path: "/bemutatkozas", label: "aboutLabel" },
  { path: "/munkaink", label: "ourWorksLabel" },
  { path: "/berelheto-gepeink", label: "machinesLabel" },
  { path: "/elerhetoseg", label: "contactUsLabel" },
  { path: "/karrier", label: "careerLabel" },
];

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
  window.addEventListener("resize", resizeListener);
  closeMobileMenuOnResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeListener);
});
</script>

<style scoped>
nav {
  position: absolute;
  right: 12rem;
  top: 20px;
  z-index: 1;
}

ul {
  display: flex;
  list-style: none;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.338);
  border: 1px solid red;
  border-radius: 50px;
  overflow: hidden;
}

li {
  text-align: center;
  margin: 0 0.2rem;
  line-height: 70px;
  position: relative;
}

.router-link-active,
a:hover {
  background: white;
  color: black;
}

a:hover {
  background: white;
  color: black;
  transition: 0.3s ease;
}

li.active {
  background: white;
  color: black;
}

a {
  text-decoration: none;
  color: white;
  padding: 0px 20px;
  background-color: rgba(0, 0, 0, 0.538);
  transition: 0.3s ease-in-out;
}

.lang-switch {
  text-decoration: none;
  color: white;
  padding: 4px 10px 0px 0px;
  background-color: rgba(0, 0, 0, 0.538);
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
  border: 3px solid rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
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
  border: 1px solid red;
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
}
</style>
