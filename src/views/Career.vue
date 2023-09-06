<template>
  <div>
    <img src="@/assets/logo3.png" alt="Logo" @click="goToHome" />
    <NavBar />
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";

const pageTitle = ref("");
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

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
