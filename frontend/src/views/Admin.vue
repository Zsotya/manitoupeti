<template>
  <div>
    <h1>Bejelentkezés a vezérlőpultba</h1>
    <form @submit.prevent="login">
      <label for="username">Felhasználónév:</label>
      <input type="text" id="username" v-model="username" required />
      <label for="password">Jelszó:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Bejelentkezés</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
  router.push("/admin/dashboard");
};
</script>

<style scoped></style>
