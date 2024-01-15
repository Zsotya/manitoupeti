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
            <th>Van kosár?</th>
            <th>Van villa?</th>
            <th>Van Rotohead?</th>
            <th>Van csörlő?</th>
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
            <td>{{ machine.has_basket ? "Igen" : "Nem" }}</td>
            <td>{{ machine.has_fork ? "Igen" : "Nem" }}</td>
            <td>{{ machine.has_rotohead ? "Igen" : "Nem" }}</td>
            <td>{{ machine.has_winch ? "Igen" : "Nem" }}</td>
            <td class="image-container">
              <img
                :src="'http://localhost:3000' + machine.image_url"
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
              <button
                class="delete-button"
                @click="openDeletePopup(machine.id)"
              >
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
  <!-- Törlés megerősítés ablak -->
  <div class="overlay" v-if="popupOpen">
    <div class="delete-popup">
      <div class="message">Biztos törölni szeretnéd?</div>
      <div class="buttons">
        <button class="accept-delete" @click="deleteMachine(deleteItemId)">
          Igen
        </button>
        <button class="cancel-delete" @click="cancelDelete">Nem</button>
      </div>
    </div>
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
  } finally {
    cancelDelete();
  }
};

/* Törlés megerősítés */
// Adatok inicializálása
const popupOpen = ref(false);
const deleteItemId = ref(null);

// Ablak megnyitása
const openDeletePopup = (machineId) => {
  deleteItemId.value = machineId;
  popupOpen.value = true;
};

// Ablak bezárása, azonosító alaphelyzetbe állítása
const cancelDelete = () => {
  deleteItemId.value = null;
  popupOpen.value = false;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-popup {
  background-color: #ffffff;
  padding: 50px;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.message {
  font-size: 18px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.accept-delete,
.cancel-delete {
  padding: 10px 20px;
  margin: 0 14px;
  font-size: 16px;
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.accept-delete:hover,
.cancel-delete:hover {
  background-color: lightgray;
}
</style>
