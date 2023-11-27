<template>
  <div class="test">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum ipsa
    sit vitae et saepe inventore eos cum accusantium laborum aspernaLorem ipsum
    dolor sit amet consectetur adipisicing elit. Minima, rerum ipsa sit vitae et
    saepe inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit
    amet consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum aspernaLorem ipsum dolor sit amet
    consectetur adipisicing elit. Minima, rerum ipsa sit vitae et saepe
    inventore eos cum accusantium laborum asperna
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import authService from "@/services/authService";

// Autentikáció (token validálása)
onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});
</script>

<style scoped></style>
