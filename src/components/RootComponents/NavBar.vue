<template>
  <nav>
    <ul>
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
            id="myonoffswitch"
            tabindex="0"
            unchecked
            @click="$i18n.locale = $i18n.locale === 'hu' ? 'en' : 'hu'"
          />
          <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const routes = [
  { path: "/bemutatkozas", label: "aboutLabel" },
  { path: "/munkaink", label: "ourWorksLabel" },
  { path: "/berelheto-gepeink", label: "machinesLabel" },
  { path: "/elerhetoseg", label: "contactUsLabel" },
  { path: "/karrier", label: "careerLabel" },
];

const $route = useRoute();
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
  padding: 10px 10px 0px 10px;
  background-color: rgba(0, 0, 0, 0.538);
  transition: 0.3s ease-in-out;
  margin: 0px;
}

.onoffswitch {
  position: relative;
  width: 90px;
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
  right: 56px;
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

/* Tablet nézet */

@media screen and (max-width: 1024px) {
  nav {
    top: 0;
    right: 0;
    width: 100%;
  }

  ul {
    justify-content: center;
  }

  a {
    width: 100%;
    padding: 0px;
  }

  li {
    margin: 0;
  }
}
</style>
