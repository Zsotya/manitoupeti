<template>
  <div class="admin-admins">
    <div class="title">
      <h2>Admin Menedzsment Panel</h2>
    </div>
    <div class="admins-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Felhasználónév</th>
            <th>Teljes név</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.id }}</td>
            <td>{{ admin.username }}</td>
            <td>{{ admin.full_name }}</td>
            <td class="actions-buttons">
              <button class="modify-button">
                <i class="fas fa-edit"></i>Módosítás
              </button>
              <button class="delete-button" @click="deleteAdmin(admin.id)">
                <i class="fas fa-trash"></i>
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/admin/admin-management/createadmin">
      <button class="add-button">
        <i class="fas fa-plus"></i>Új admin létrehozása
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import authService from "@/services/authService";
import axios from "axios";

// Autentikáció (token validálása)
onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});

// Adatok fetchelése
const admins = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/admins");
    admins.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Admin törlése
const deleteAdmin = async (adminId) => {
  try {
    await axios.delete(`http://localhost:3000/api/admins/${adminId}`);
    admins.value = admins.value.filter((admin) => admin.id !== adminId);
  } catch (error) {
    console.error("Hiba az admin törlése közben:", error);
  }
};
</script>

<style scoped>
.admin-admins {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.admins-table {
  margin-top: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.actions-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  border-bottom: none;
  border-right: none;
  border-left: none;
}

.modify-button,
.delete-button {
  padding: 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  display: flex;
  gap: 4px;
}

.modify-button {
  background-color: #007bff;
}

.delete-button {
  background-color: red;
}

.modify-button:hover {
  background-color: #0056b3;
}

.delete-button:hover {
  background-color: rgb(130, 14, 14);
}

.add-button {
  margin-top: 20px;
  background-color: #28a745;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #218838;
}

.fa-plus {
  padding-right: 5px;
}
</style>
