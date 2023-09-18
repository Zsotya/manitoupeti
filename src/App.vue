<template>
  <div id="app">
    <NavBar />
    <Logo />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "@/components/RootComponents/NavBar.vue";
import Footer from "./components/RootComponents/Footer.vue";
import Logo from "./components/RootComponents/Logo.vue";
</script>

<style scoped></style>
