<template>
  <div>
    <Logo />
    <NavBar />
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Logo from "@/components/Logo.vue";

const pageTitle = ref("");
const router = useRouter();

// pageTitle komponens beállítása oldaltól függően
const route = router.currentRoute.value;
if (route.path === "/bemutatkozas") {
  pageTitle.value = "Bemutatkozás";
} else if (route.path === "/berelheto-gepeink") {
  pageTitle.value = "Bérelhető gépeink";
} else if (route.path === "/munkaink") {
  pageTitle.value = "Munkáink";
} else if (route.path === "/elerhetoseg") {
  pageTitle.value = "Elérhetőség";
} else if (route.path === "/karrier") {
  pageTitle.value = "Karrier";
}
</script>
