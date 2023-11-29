<template>
  <div class="admin-machines">
    <div class="title">
      <h2>Admin Gépeink Menedzsment Panel</h2>
    </div>
    <div class="machines-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nehézgép neve</th>
            <th>Max magasság</th>
            <th>Max teherbírás</th>
            <th>Van talp</th>
            <th>Talpak száma</th>
            <th>Van kosár</th>
            <th>Van villa</th>
            <th>Távirányítható</th>
            <th>Napi ár</th>
            <th>Kép</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in machines" :key="machine.id">
            <td>{{ machine.id }}</td>
            <td>{{ machine.machine_name }}</td>
            <td>{{ machine.max_height }}m</td>
            <td>{{ machine.max_weight }}kg</td>
            <td>{{ machine.has_sole ? "Igen" : "Nem" }}</td>
            <td>{{ machine.sole_count }}</td>
            <td>{{ machine.has_basket ? "Igen" : "Nem" }}</td>
            <td>{{ machine.has_fork ? "Igen" : "Nem" }}</td>
            <td>{{ machine.is_remote ? "Igen" : "Nem" }}</td>
            <td>{{ machine.price_per_day }}Ft</td>
            <td class="image-container">
              <img
                :src="machine.image_url"
                alt="machine.image_url"
                class="thumbnail"
              />
            </td>
            <td class="actions-buttons">
              <router-link :to="`/admin/machines-management/${machine.id}`">
                <button class="modify-button">
                  <i class="fas fa-edit"></i>Módosítás
                </button></router-link
              >
              <button class="delete-button" @click="deleteMachine(machine.id)">
                <i class="fas fa-trash"></i>
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/admin/machines-management/createmachine">
      <button class="add-button">
        <i class="fas fa-plus"></i>Új nehézgép létrehozása
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import authService from "@/services/authService";
import axios from "axios";
import { useRouter } from "vue-router";

// Autentikáció (token validálása)
const router = useRouter();
onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    router.push("/admin");
  }
});

// Adatok fetchelése
const machines = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/machines");
    machines.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Nehézgép törlése
const deleteMachine = async (machineId) => {
  try {
    await axios.delete(`http://localhost:3000/api/machines/${machineId}`);
    machines.value = machines.value.filter(
      (machine) => machine.id !== machineId
    );
  } catch (error) {
    console.error("Hiba a nehézgép törlése közben:", error);
  }
};
</script>

<style scoped>
.admin-machines {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.machines-table {
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

.image-container {
  text-align: center;
}

.thumbnail {
  max-height: 300px;
  max-width: 110px;
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
