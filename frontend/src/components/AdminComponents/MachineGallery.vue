<template>
  <div class="machine-gallery">
    <div class="title">
      <h2>Nehézgép galéria módosítása</h2>
    </div>
    <div class="existing-images">
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
          <tr v-for="image in machineImages" :key="image.id">
            <td>{{ image.id }}</td>
            <td class="image-container">
              <img
                :src="'http://localhost:3000' + image.image_url"
                alt="Machine Image"
                class="thumbnail"
              />
            </td>
            <td>{{ image.order }}</td>
            <td class="image-options">
              <div class="button-container">
                <button
                  class="action-button up-button"
                  @click="changeOrder(image.id, 'up')"
                >
                  <i class="fas fa-arrow-up"></i>
                </button>
                <button
                  class="action-button down-button"
                  @click="changeOrder(image.id, 'down')"
                >
                  <i class="fas fa-arrow-down"></i>
                </button>

                <button
                  class="action-button delete-button"
                  @click="deleteImage(image.id)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Új kép feltöltése -->
    <div class="upload-new-images">
      <div class="upload-header">
        <h3>Kép feltöltése</h3>
        <div class="file-input-container">
          <label for="image" class="file-input-label"
            ><span v-if="!imageFile">Képfájl kiválasztása</span>
            <span v-else>Képfájl módosítása</span></label
          >
          <input type="file" @change="handleImageUpload" accept="image/*" />
        </div>
      </div>
      <button class="upload-button" @click="uploadImages" v-if="imageFile">
        Feltöltés
      </button>
      <!-- Kép előnézet -->
      <div class="preview-image-container" v-if="imagePreviewUrl">
        <h4>Kép előnézet</h4>
        <img :src="imagePreviewUrl" alt="Image Preview" class="preview-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

// Adatok inicializálása
const route = useRoute();
const machineId = route.params.id;
const machineImages = ref([]);
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

// Meglévő képek lekérdezése (sorszám szerint növekvő sorrendben)
const fetchData = async () => {
  try {
    // Lekérdezés
    const response = await axios.get(
      `http://localhost:3000/api/machines/gallery/${machineId}`
    );
    machineImages.value = response.data;
  } catch (error) {
    // Hibakezelés
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
};

onMounted(() => {
  fetchData();
});

// Kép előnézet logika
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  imageFile.value = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreviewUrl.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreviewUrl.value = null;
  }
};

// Képfeltöltés logika
const uploadImages = async () => {
  if (!imageFile.value) {
    console.error("Nincs kiválasztva képfájl");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile.value);

  try {
    await axios.post(
      `http://localhost:3000/api/machines/gallery/${machineId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    imageFile.value = null;
    imagePreviewUrl.value = null;
    fetchData();
  } catch (error) {
    console.error("Hiba a kép feltöltése közben:", error);
  }
};

// Képtörlés logika
const deleteImage = async (imageId) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/machines/gallery/${machineId}/${imageId}`
    );
    // A törölt kép eltávolítása lokálisan
    machineImages.value = machineImages.value.filter(
      (image) => image.id !== imageId
    );
  } catch (error) {
    console.error("Hiba a kép törlése közben:", error);
  }
};

// Sorrend módosítás
const changeOrder = async (imageId, direction) => {
  // Kép index megkeresése
  const index = machineImages.value.findIndex((image) => image.id === imageId);

  // Index validálása
  if (index === -1) {
    console.error("Kép nem található a lokális tárhelyen");
    return;
  }

  // Lokális sorrend módosítása, új sorszám kiszámítása
  const updatedImages = [...machineImages.value];
  const imageToMove = updatedImages[index];
  const newOrder =
    direction === "up" ? imageToMove.order - 1 : imageToMove.order + 1;

  // Sorszám legkisebb értékének beállítása
  const minOrder = 1;
  if (newOrder < minOrder) {
    alert(`Az új sorszám nem lehet ${minOrder}-nél kisebb!`);
  }

  // Sorrend módosítás adatbázisban
  try {
    await axios.put(
      `http://localhost:3000/api/machines/gallery/${machineId}/changeOrder`,
      {
        imageId,
        newOrder,
      }
    );
    fetchData();
  } catch (error) {
    // Hibakeresés
    console.error("Hiba a kép sorrendjének módosítása közben:", error);
    alert("Sorrend módosítás sikertelen. Kérem, próbálja újra később.");
  }
};
</script>

<style scoped>
.machine-gallery {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.existing-images {
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
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
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

.image-options {
  width: 12%;
}

.button-container {
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

.delete-button {
  background-color: #e74c3c;
}

.upload-new-images {
  margin-top: 40px;
}

.upload-button {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #45a049;
}

.preview-image {
  max-width: 400px;
  max-height: 400px;
}
</style>
