<template>
  <div class="revenue-component"><MonthlyRevenue /></div>
  <div class="bookings-component"><MonthlyBookings /></div>
</template>

<script setup>
import { onMounted } from "vue";
import authService from "@/services/authService";
import MonthlyRevenue from "@/components/StatisticsComponents/MonthlyRevenue.vue";
import MonthlyBookings from "@/components/StatisticsComponents/MonthlyBookings.vue";

// Autentikáció (token validálása)
onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});
</script>
