<template>
  <div class="create-admin">
    <h2>Új Admin Létrehozása</h2>
    <form @submit.prevent="addAdmin">
      <div class="form-group">
        <label for="username">Felhasználónév:</label>
        <input type="text" id="username" v-model="newAdmin.username" required />
      </div>

      <div class="form-group">
        <label for="password">Jelszó:</label>
        <input
          type="password"
          id="password"
          v-model="newAdmin.password"
          required
        />
      </div>

      <div class="form-group">
        <label for="full_name">Teljes név:</label>
        <input
          type="text"
          id="full_name"
          v-model="newAdmin.full_name"
          required
        />
      </div>

      <button type="submit" class="submit-button">Admin létrehozása</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();

// Adatok inicializálása
const newAdmin = {
  username: "",
  password: "",
  full_name: "",
};

// Létrehozás
const addAdmin = async () => {
  try {
    // POST request küldése
    const response = await axios.post(
      "http://localhost:3000/api/admins",
      newAdmin
    );
    // Sikeres létrehozás esetén navigáció
    console.log("Admin felhasználó sikeresen létrehozva:", response.data);
    router.push("/admin/admin-management");
  } catch (error) {
    console.error("Hiba az admin létrehozása közben:", error);
  }
};
</script>

<style scoped>
.create-admin {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  padding-bottom: 20px;
}

form {
  width: 40%;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
}

.submit-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
