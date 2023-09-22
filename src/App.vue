<template>
  <div id="app">
    <header><NavBar /></header>
    <Logo />
    <main class="content">
      <router-view />
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import NavBar from "@/components/RootComponents/NavBar.vue";
import Footer from "./components/RootComponents/Footer.vue";
import Logo from "./components/RootComponents/Logo.vue";
</script>

<style scoped></style>
