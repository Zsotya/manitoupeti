<template>
  <MonthlyRevenue />
</template>

<script setup>
import { onMounted } from "vue";
import authService from "@/services/authService";
import MonthlyRevenue from "@/components/StatisticsComponents/MonthlyRevenue.vue";

onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});
</script>
