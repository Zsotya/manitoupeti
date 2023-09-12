<template>
  <div class="logodiv">
    <img class="logo" src="@/assets/logo3.png" alt="Logo" @click="goToHome" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goToHome = () => {
  router.push({ path: "/" });
};
</script>

<style scoped>
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 0;
}
</style>
