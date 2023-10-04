<template>
  <div id="app">
    <header v-if="$route.meta.showNavbar"><NavBar /></header>
    <!-- <Logo /> -->
    <main class="content">
      <router-view />
    </main>
    <footer v-if="$route.meta.showFooter"><Footer /></footer>
  </div>
</template>

<script setup>
import NavBar from "@/components/RootComponents/NavBar.vue";
import Footer from "./components/RootComponents/Footer.vue";
import Logo from "./components/RootComponents/Logo.vue";
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
