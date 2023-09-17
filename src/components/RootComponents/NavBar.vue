<template>
  <nav>
    <ul>
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="true"
      >
        <li>{{ route.label }}</li>
      </router-link>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const routes = [
  { path: "/bemutatkozas", label: "Bemutatkozás" },
  { path: "/munkaink", label: "Munkáink" },
  { path: "/berelheto-gepeink", label: "Bérelhető gépeink" },
  { path: "/elerhetoseg", label: "Elérhetőség" },
  { path: "/karrier", label: "Karrier" },
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
