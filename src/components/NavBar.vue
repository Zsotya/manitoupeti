<template>
  <nav>
    <ul>
      <router-link
        to="/bemutatkozas"
        :class="{ active: $route.path === '/bemutatkozas' }"
        ><li>Bemutatkozás</li></router-link
      >
      <router-link
        to="/munkaink"
        :class="{ active: $route.path === '/munkaink' }"
        ><li>Munkáink</li></router-link
      >
      <router-link
        to="/berelheto-gepeink"
        :class="{ active: $route.path === '/berelheto-gepeink' }"
        ><li>Bérelhető gépeink</li></router-link
      >
      <router-link
        to="/elerhetoseg"
        :class="{ active: $route.path === '/elerhetoseg' }"
        ><li>Elérhetőség</li></router-link
      >
      <router-link to="/karrier" :class="{ active: $route.path === '/karrier' }"
        ><li>Karrier</li></router-link
      >
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  position: absolute;
  right: 200px;
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
  margin: 0;
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
}
</style>
