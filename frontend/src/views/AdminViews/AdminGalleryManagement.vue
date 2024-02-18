<template>
  <div class="admin-gallery">
    <div class="title">
      <h2>Admin Galéria Menedzsment Panel</h2>
    </div>
    <!-- Képfeltöltés -->
    <label for="imageUpload" class="custom-file-label">
      <i class="fas fa-plus"></i>Képfeltöltés
      <input
        id="imageUpload"
        type="file"
        @change="handleImageUpload"
        accept="image/*"
        multiple
      />
    </label>
    <div class="gallery-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kép</th>
            <th>Sorszám</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="image in gallery" :key="image.id">
            <td>{{ image.id }}</td>
            <td class="image-container">
              <img
                :src="'http://localhost:3000' + image.thumbnail_url"
                alt="thumbnail_url"
                class="thumbnail"
              />
            </td>
            <td>{{ image.order }}</td>
            <td class="actions-buttons">
              <!-- Törlés gomb -->
              <button class="delete-button" @click="openDeletePopup(image.id)">
                <i class="fas fa-trash"></i>
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Törlés megerősítés ablak -->
  <div class="overlay" v-if="popupOpen">
    <div class="delete-popup">
      <div class="message">Biztos törölni szeretnéd?</div>
      <div class="buttons">
        <button class="accept-delete" @click="deleteImage(deleteItemId)">
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
const gallery = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/gallery");
    gallery.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Kép törlése
const deleteImage = async (imageId) => {
  try {
    await axios.delete(`http://localhost:3000/api/gallery/${imageId}`);
    gallery.value = gallery.value.filter((image) => image.id !== imageId);
  } catch (error) {
    console.error("Hiba a kép törlése közben:", error);
  } finally {
    cancelDelete();
  }
};

/* Törlés megerősítés */
// Adatok inicializálása
const popupOpen = ref(false);
const deleteItemId = ref(null);

// Ablak megnyitása
const openDeletePopup = (imageId) => {
  deleteItemId.value = imageId;
  popupOpen.value = true;
};

// Ablak bezárása, azonosító alaphelyzetbe állítása
const cancelDelete = () => {
  deleteItemId.value = null;
  popupOpen.value = false;
};

// Képfeltöltés kezelése
const handleImageUpload = async (event) => {
  // Képfájlok
  const files = event.target.files;

  // Ha nincs képfájl megadva, kilépés
  if (files.length === 0) {
    return;
  }

  // Új form a képekhez
  const formData = new FormData();

  // Több kép miatt for-ciklus
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  // Képek elküldése a backendnek
  try {
    const response = await axios.post(
      "http://localhost:3000/api/gallery/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Sikeres feltöltés esetén válasz, adatok frissítése
    console.log(response.data);
    location.reload();
  } catch (error) {
    // Hibakezelés
    console.error("Hiba a képek feltöltése közben:", error);
  }
};
</script>

<style scoped>
.admin-gallery {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.gallery-table {
  margin-top: 10px;
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

.delete-button {
  background-color: red;
}

.delete-button:hover {
  background-color: rgb(130, 14, 14);
}

.custom-file-label {
  margin-top: 40px;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.custom-file-label:hover {
  background-color: #218838;
}

.custom-file-label input {
  display: none;
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
