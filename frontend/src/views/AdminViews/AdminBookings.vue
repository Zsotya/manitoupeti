<template>
  <div class="bookings">
    <div class="pending-bookings">
      <PendingBookings />
    </div>
    <div class="approved-bookings">
      <ApprovedBookings />
    </div>
    <div class="expired-bookings">
      <ExpiredBookings />
    </div>
  </div>
</template>

<script setup>
import PendingBookings from "@/components/AdminComponents/PendingBookings.vue";
import ApprovedBookings from "@/components/AdminComponents/ApprovedBookings.vue";
import ExpiredBookings from "@/components/AdminComponents/ExpiredBookings.vue";
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
