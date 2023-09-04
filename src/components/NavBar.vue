<template>
  <nav>
    <ul>
      <router-link to="/bemutatkozas"><li>Bemutatkozás</li></router-link>
      <router-link to="/munkaink"><li>Munkáink</li></router-link>
      <router-link to="/berelheto-gepeink"
        ><li>Bérelhető gépeink</li></router-link
      >
      <router-link to="/elerhetoseg"><li>Elérhetőség</li></router-link>
      <router-link to="/karrier"><li>Karrier</li></router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
nav {
  position: absolute;
  right: 250px;
  top: 20px;
}
ul {
  display: flex;
  list-style: none;
  justify-content: right;
}

li {
  padding: 0 25px;
  border: 1px solid red;
  background-color: rgba(0, 0, 0, 0.538);
  text-align: center;
  background: transparent;
  margin: 0;
  line-height: 68px;
}
</style>
