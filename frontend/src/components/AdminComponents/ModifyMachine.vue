<template>
  <div class="modify-machine">
    <div class="title">
      <h2>Nehézgép adatainak módosítása</h2>
    </div>

    <!-- Adatmódosítás form -->
    <form @submit.prevent="modifyMachine">
      <div class="form-group">
        <label for="machine_name">Nehézgép neve</label>
        <input v-model="machineData.machine_name" required />
      </div>
      <div class="form-group">
        <label for="machine_name">Max Magasság</label>
        <input v-model="machineData.max_height" required />
      </div>
      <div class="form-group">
        <label for="machine_name">Max Teherbírás</label>
        <input v-model="machineData.max_weight" required />
      </div>
      <div class="form-group">
        <label for="machine_name">Van kosár?</label>
        <div class="styled-select">
          <select v-model="machineData.has_basket">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="machine_name">Van villa?</label>
        <div class="styled-select">
          <select v-model="machineData.has_fork">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="machine_name">Van Rotohead?</label>
        <div class="styled-select">
          <select v-model="machineData.has_rotohead">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="machine_name">Van csörlő?</label>
        <div class="styled-select">
          <select v-model="machineData.has_winch">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>

      <!-- PDF feltöltés lehetőség -->
      <div class="form-group">
        <label for="upload_pdf"
          >Szeretnél PDF-et feltölteni/meglévő PDF-et módosítani?</label
        >
        <div class="styled-select">
          <select v-model="machineData.upload_pdf">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>

      <!-- PDF fájlfeltöltés -->
      <div v-if="machineData.upload_pdf === 'Yes'" class="form-group">
        <label for="pdf" class="file-input-label">
          <span v-if="!pdfName">PDF feltöltése</span>
          <span v-else>PDF módosítása</span>
        </label>
        <input type="file" id="pdf" accept=".pdf" @change="handlePdfUpload" />
      </div>

      <!-- Kiválasztott PDF megjelenítése -->
      <div
        v-if="pdfName && machineData.upload_pdf === 'Yes'"
        class="selected-pdf"
      >
        Kiválasztott PDF: {{ pdfName }}
      </div>

      <!-- PDF törlése checkbox -->
      <div class="form-group" v-if="machineData.upload_pdf === 'Yes'">
        <label for="remove_pdf">PDF eltávolítása</label>
        <input
          type="checkbox"
          id="remove_pdf"
          v-model="machineData.remove_pdf"
        />
      </div>

      <!-- Képfeltöltés, képmódosítás -->
      <div class="form-group">
        <label for="image" class="file-input-label"
          ><span v-if="!imagePreviewUrl">Kép feltöltése</span>
          <span v-else>Kép módosítása</span></label
        >
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageUpload"
        />
      </div>

      <!-- Kép előnézet -->
      <div class="image-preview" v-if="imagePreviewUrl">
        <img :src="imagePreviewUrl" alt="Image Preview" />
      </div>

      <!-- Véglegesítés gomb -->
      <div class="form-group">
        <button type="submit">Nehézgép módosítása</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Adatok inicializálása
const machineData = ref({
  machine_name: "",
  max_height: "",
  max_weight: "",
  has_basket: "",
  has_fork: "",
  has_rotohead: "",
  has_winch: "",
  upload_pdf: "",
  remove_pdf: false,
  pdf: null,
  image: null,
});

const pdfFile = ref(null);
const pdfName = ref(null);
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

// Adatok beállítása a régi értékre
onMounted(async () => {
  const machineId = route.params.id;
  const response = await axios.get(
    `http://localhost:3000/api/machines/${machineId}`
  );
  const data = response.data;
  // Módosítás előtti értékek
  machineData.value = {
    machine_name: data.machine_name,
    max_height: data.max_height,
    max_weight: data.max_weight,
    has_basket: data.has_basket ? "Yes" : "No",
    has_fork: data.has_fork ? "Yes" : "No",
    has_rotohead: data.has_rotohead ? "Yes" : "No",
    has_winch: data.has_winch ? "Yes" : "No",
    upload_pdf: data.pdf_url ? "Yes" : "No",
    pdf: data.pdf_url,
    image: data.image_url,
  };
  pdfName.value = machineData.value.pdf;
  imagePreviewUrl.value = "http://localhost:3000" + machineData.value.image;
});

// Képfeltöltés, előnézet kezelése
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
    imagePreviewUrl.value = machineData.value.image;
  }
};

// PDF feltöltés kezelés
const handlePdfUpload = (event) => {
  const file = event.target.files[0];
  pdfFile.value = file;
  pdfName.value = file ? file.name : machineData.value.pdf;
};

// Módosítás
const modifyMachine = async () => {
  // Form adatok
  const formData = new FormData();
  formData.append("machine_name", machineData.value.machine_name);
  formData.append("max_height", machineData.value.max_height);
  formData.append("max_weight", machineData.value.max_weight);
  formData.append("has_basket", machineData.value.has_basket === "Yes" ? 1 : 0);
  formData.append("has_fork", machineData.value.has_fork === "Yes" ? 1 : 0);
  formData.append(
    "has_rotohead",
    machineData.value.has_rotohead === "Yes" ? 1 : 0
  );
  formData.append("has_winch", machineData.value.has_winch === "Yes" ? 1 : 0);

  if (imageFile.value) {
    formData.append("image", imageFile.value);
  } else {
    formData.append("image", machineData.value.image); // Ha nem került új fájl kiválasztásra, akkor a régi URL-t kapja
  }

  if (machineData.value.remove_pdf) {
    // PDF null-ra állítás adatbázisban
    formData.append("pdf", "null");
  } else if (pdfFile.value) {
    formData.append("pdf", pdfFile.value);
  } else {
    formData.append("pdf", machineData.value.pdf); // Ha nem került új fájl kiválasztásra, akkor a régi URL-t kapja
  }

  // PUT request küldése
  try {
    const machineId = route.params.id;
    const response = await axios.put(
      `http://localhost:3000/api/machines/${machineId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Sikeres küldés esetén navigálás
    console.log("Nehézgép sikeresen módosítva:", response.data);
    router.push("/admin/machines-management");
  } catch (error) {
    console.error("Hiba a nehézgép módosításakor:", error);
  }
};
</script>

<style scoped>
.modify-machine {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

.file-input-label {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-input-label:hover {
  background-color: #0056b3;
}

input[type="text"],
input[type="file"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  display: none;
}

.image-preview {
  text-align: center;
  margin-top: 20px;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  margin: 0 auto;
  display: block;
}

button[type="submit"] {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #218838;
}

.styled-select {
  position: relative;
  width: 100%;
  max-width: 170px;
}

.styled-select select {
  width: 100%;
  padding: 10px;
  border: 1px solid;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  /* Alapértelmezett nyíl eltűntetésére */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 0.01px;
}

.styled-select i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
