<template>
  <div class="login">
    <h1 class="login-title">Bejelentkezés a vezérlőpultba</h1>
    <form @submit.prevent="login" class="login-form">
      <label for="username" class="login-label">Felhasználónév:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="login-input"
        required
      />
      <label for="password" class="login-label">Jelszó:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="login-input"
        required
      />
      <button type="submit" class="login-button">Bejelentkezés</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Adatok inicializálása
const username = ref("");
const password = ref("");
const router = useRouter();

// Bejelentkezési kísérlet
const login = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/authentication",
      {
        username: username.value,
        password: password.value,
      }
    );
    // Sikeres bejelentkezés
    if (response.data.authenticated) {
      localStorage.setItem("token", response.data.token);
      if (response.data.is_main_admin === 1) {
        localStorage.setItem("isMainAdmin", "true");
      } else {
        localStorage.setItem("isMainAdmin", "false");
      }
      router.push("/admin/dashboard");
    }
    // Sikertelen bejelentkezés
    else {
      console.log("Hibás bejelentkezési adatok. Kérjük, próbálja újra.");
    }
  } catch (error) {
    // Hibakezelés
    console.error("Hiba a bejelentkezéskor:", error);
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120px;
}

.login-title {
  font-size: 28px;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.login-label {
  font-size: 20px;
  margin-bottom: 8px;
}

.login-input {
  padding: 10px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  width: 100%;
}

.login-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
