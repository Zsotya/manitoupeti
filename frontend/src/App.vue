<template>
  <div id="app">
    <!-- MAIN APP PART -->

    <div v-if="$route.meta.isMainApp">
      <header><NavBar /></header>
      <!-- <section><Logo /></section> -->
      <main class="main-content">
        <router-view />
      </main>
      <footer><Footer /></footer>
    </div>

    <!-- ADMIN LOGIN PART -->
    <section v-if="$route.meta.isAdminLogin" class="admin-login">
      <router-view />
    </section>

    <!-- ADMIN APP PART -->
    <section v-if="$route.meta.isAdminApp" class="admin-app">
      <Sidebar />
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
import Sidebar from "./components/AdminComponents/Sidebar.vue";
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.admin-app {
  display: flex;
  width: 100%;
}

.admin-content {
  width: 100%;
}
</style>
