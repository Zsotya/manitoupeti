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
import axios from "axios";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/authentication",
      {
        username: username.value,
        password: password.value,
      }
    );
    if (response.data.authenticated) {
      localStorage.setItem("token", response.data.token);
      router.push("/admin/dashboard");
    } else {
      console.log("Ejnye bejnye, csúnya betörő");
    }
  } catch (error) {
    console.error("Hiba a bejelentkezéskor:", error);
  }
};
</script>

<style scoped></style>
