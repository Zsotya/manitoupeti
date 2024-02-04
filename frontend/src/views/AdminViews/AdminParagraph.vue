<template>
  <div class="admin-paragraphs">
    <div class="title">
      <h2>Admin Paragrafus Menedzsment Panel</h2>
    </div>
    <div class="paragraphs-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cím (HU)</th>
            <th>Cím (EN)</th>
            <th>Tartalom (HU)</th>
            <th>Tartalom (EN)</th>
            <th>Kép</th>
            <th>Sorszám</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paragraph in paragraphs" :key="paragraph.id">
            <td>{{ paragraph.id }}</td>
            <td>{{ paragraph.title_hu }}</td>
            <td>{{ paragraph.title_en }}</td>
            <td>{{ paragraph.content_hu }}</td>
            <td>{{ paragraph.content_en }}</td>
            <td class="image-container">
              <img
                :src="'http://localhost:3000' + paragraph.image_url"
                alt="paragraph.image_url"
                class="thumbnail"
              />
            </td>
            <td>{{ paragraph.order }}</td>
            <td class="actions-buttons">
              <!-- Módosítás gomb -->
              <router-link :to="`/admin/paragraph-management/${paragraph.id}`">
                <button class="modify-button">
                  <i class="fas fa-edit"></i>Módosítás
                </button></router-link
              >

              <!-- Törlés gomb -->
              <button
                class="delete-button"
                @click="openDeletePopup(paragraph.id)"
              >
                <i class="fas fa-trash"></i>
                Törlés
              </button>

              <!-- Sorszám váltó gombok -->
              <div class="order-button-container">
                <button
                  class="action-button up-button"
                  @click="changeOrder(paragraph.id, 'up')"
                >
                  <i class="fas fa-arrow-up"></i>
                </button>
                <button
                  class="action-button down-button"
                  @click="changeOrder(paragraph.id, 'down')"
                >
                  <i class="fas fa-arrow-down"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/admin/paragraph-management/createparagraph">
      <button class="add-button">
        <i class="fas fa-plus"></i>Új paragrafus hozzáadása
      </button>
    </router-link>
  </div>
  <!-- Törlés megerősítés ablak -->
  <div class="overlay" v-if="popupOpen">
    <div class="delete-popup">
      <div class="message">Biztos törölni szeretnéd?</div>
      <div class="buttons">
        <button class="accept-delete" @click="deleteParagraph(deleteItemId)">
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
const paragraphs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/paragraphs");
    paragraphs.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Paragrafus törlése
const deleteParagraph = async (paragraphId) => {
  try {
    await axios.delete(`http://localhost:3000/api/paragraphs/${paragraphId}`);
    paragraphs.value = paragraphs.value.filter(
      (paragraph) => paragraph.id !== paragraphId
    );
  } catch (error) {
    console.error("Hiba a paragrafus törlése közben:", error);
  } finally {
    cancelDelete();
  }
};

/* Törlés megerősítés */
// Adatok inicializálása
const popupOpen = ref(false);
const deleteItemId = ref(null);

// Ablak megnyitása
const openDeletePopup = (paragraphId) => {
  deleteItemId.value = paragraphId;
  popupOpen.value = true;
};

// Ablak bezárása, azonosító alaphelyzetbe állítása
const cancelDelete = () => {
  deleteItemId.value = null;
  popupOpen.value = false;
};

// Sorrend módosítása
const changeOrder = async (paragraphId, direction) => {
  // Paragrafus index megkeresés
  const index = paragraphs.value.findIndex(
    (paragraph) => paragraph.id === paragraphId
  );

  // Index validálása
  if (index === -1) {
    console.error("Paragrafus nem található a lokális tárhelyen");
    return;
  }

  // Lokális sorrend módosítása, új sorszám kiszámítása
  const updatedParagraphs = [...paragraphs.value];
  const paragraphToMove = updatedParagraphs[index];
  const newOrder =
    direction === "up" ? paragraphToMove.order - 1 : paragraphToMove.order + 1;

  // Sorszám legkisebb értékének beállítása
  const minOrder = 1;
  if (newOrder < minOrder) {
    alert(`Az új sorszám nem lehet ${minOrder}-nél kisebb!`);
  }

  // Sorrend módosítás adatbázisban
  try {
    await axios.put(
      `http://localhost:3000/api/paragraphs/${paragraphId}/changeOrder`,
      {
        newOrder,
      }
    );
    fetchData();
  } catch (error) {
    // Hibakeresés
    console.error("Hiba a paragrafus sorrendjének módosítása közben:", error);
    alert("Sorrend módosítás sikertelen. Kérem, próbálja újra később.");
  }
};
</script>

<style scoped>
.admin-paragraphs {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.paragraphs-table {
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

.order-button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.action-button {
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #297fb8;
}

.up-button {
  background-color: #2ecc71;
}

.down-button {
  background-color: #e67e22;
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
