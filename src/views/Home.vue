<template>
  <div>
    <img src="@/assets/logo.png" alt="Logo" @click="goToHome" />
    <h1>Főoldal</h1>
    <img src="@/assets/images/41.jpg" alt="Landing Image" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push({ path: "/" });
};
</script>
