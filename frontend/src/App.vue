<template>
  <div id="app">
    <!-- MAIN APP PART -->

    <div v-if="$route.meta.isMainApp">
      <header><NavBar /></header>
      <!-- <section><Logo /></section> -->
      <main class="main-content">
        <router-view />
      </main>
      <div class="chatbot"><Chatbot /></div>
      <footer><Footer /></footer>
    </div>

    <!-- ADMIN LOGIN PART -->
    <section v-if="$route.meta.isAdminLogin" class="admin-login">
      <router-view />
    </section>

    <!-- ADMIN APP PART -->
    <section v-if="$route.meta.isAdminApp" class="admin-app">
      <div class="sidebar"><Sidebar /></div>
      <main class="admin-content">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup>
import NavBar from "./components/RootComponents/NavBar.vue";
import Footer from "./components/RootComponents/Footer.vue";
import Logo from "./components/RootComponents/Logo.vue";
import Sidebar from "./components/RootComponents/Sidebar.vue";
import Chatbot from "./components/RootComponents/Chatbot.vue";
import io from "socket.io-client";
import { onMounted } from "vue";

// WebSocket
const socket = io("http://localhost:3000");

onMounted(() => {
  socket.connect();
});
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.admin-app {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  top: 0px;
  left: 0px;
}

.admin-content {
  width: 100%;
  margin-left: 250px;
}
</style>
