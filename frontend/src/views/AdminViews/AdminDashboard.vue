<template></template>

<script setup>
import { onMounted } from "vue";
import authService from "@/services/authService";

onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});
</script>

<style scoped></style>