<template>
  <div class="create-machine">
    <div class="title">
      <h2>Új nehézgép létrehozása</h2>
    </div>
    <!-- Machine adatok -->
    <form @submit.prevent="createMachine">
      <div class="form-group">
        <label for="machine_name">Nehézgép neve</label>
        <input v-model="machineData.machine_name" required />
      </div>
      <div class="form-group">
        <label for="max_height">Max magasság</label>
        <input v-model="machineData.max_height" required /> m
      </div>
      <div class="form-group">
        <label for="max_weight">Max teherbírás</label>
        <input v-model="machineData.max_weight" required /> kg
      </div>
      <div class="form-group">
        <label for="height">Magasság</label>
        <input v-model="machineData.height" required /> mm
      </div>
      <div class="form-group">
        <label for="width">Szélesség</label>
        <input v-model="machineData.width" required /> mm
      </div>
      <div class="form-group">
        <label for="length">Hosszúság</label>
        <input v-model="machineData.length" required /> mm
      </div>
      <div class="form-group">
        <label for="weight">Önsúly</label>
        <input v-model="machineData.weight" required /> kg
      </div>
      <div class="form-group">
        <label for="has_basket">Van kosár?</label>
        <div class="styled-select">
          <select v-model="machineData.has_basket">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="has_fork">Van villa?</label>
        <div class="styled-select">
          <select v-model="machineData.has_fork">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="has_forkextension">Van villahosszabbító?</label>
        <div class="styled-select">
          <select v-model="machineData.has_forkextension">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="has_rotohead">Van Rotohead?</label>
        <div class="styled-select">
          <select v-model="machineData.has_rotohead">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="has_winch">Van csörlő?</label>
        <div class="styled-select">
          <select v-model="machineData.has_winch">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>

      <!-- PDF feltöltés lehetőség -->
      <div class="form-group">
        <label for="upload_pdf">Szeretnél PDF-et feltölteni?</label>
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
          <span v-if="!pdfFile">PDF feltöltése</span>
          <span v-else>PDF módosítása</span>
        </label>
        <input type="file" id="pdf" accept=".pdf" @change="handlePdfUpload" />
      </div>

      <!-- Kiválasztott PDF megjelenítése -->
      <div v-if="pdfFile" class="selected-pdf">
        Kiválasztott PDF: {{ pdfFile.name }}
      </div>

      <!-- Kép feltöltés -->
      <div class="form-group">
        <label for="image" class="file-input-label"
          ><span v-if="!imageFile">Kép feltöltése</span>
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

      <!-- Létrehozás -->
      <div class="form-group">
        <button type="submit">Nehézgép létrehozása</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();

// Adatok inicializálása
const machineData = ref({
  machine_name: "",
  max_height: "",
  max_weight: "",
  height: "",
  width: "",
  length: "",
  weight: "",
  has_basket: "Yes",
  has_fork: "Yes",
  has_forkextension: "Yes",
  has_rotohead: "Yes",
  has_winch: "Yes",
  upload_pdf: "No",
});

const pdfFile = ref(null);
const imageFile = ref(null);
const imagePreviewUrl = ref(null);

// Létrehozás
const createMachine = async () => {
  const formData = new FormData();
  formData.append("machine_name", machineData.value.machine_name);
  formData.append("max_height", machineData.value.max_height);
  formData.append("max_weight", machineData.value.max_weight);
  formData.append("height", machineData.value.height);
  formData.append("width", machineData.value.width);
  formData.append("length", machineData.value.length);
  formData.append("weight", machineData.value.weight);
  formData.append("has_basket", machineData.value.has_basket === "Yes" ? 1 : 0);
  formData.append("has_fork", machineData.value.has_fork === "Yes" ? 1 : 0);
  formData.append(
    "has_forkextension",
    machineData.value.has_forkextension === "Yes" ? 1 : 0
  );
  formData.append(
    "has_rotohead",
    machineData.value.has_rotohead === "Yes" ? 1 : 0
  );
  formData.append("has_winch", machineData.value.has_winch === "Yes" ? 1 : 0);
  formData.append("image", imageFile.value);
  if (machineData.value.upload_pdf === "Yes") {
    formData.append("pdf", pdfFile.value);
  }
  try {
    // POST request küldése
    const response = await axios.post(
      "http://localhost:3000/api/machines",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Sikeres létrehozás esetén navigáció
    console.log("Nehézgép sikeresen létrehozva:", response.data);
    router.push("/admin/machines-management");
  } catch (error) {
    console.error("Hiba a nehézgép létrehozása közben:", error);
  }
};

// Képfeltöltés, kép előnézet kezelése
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

// PDF feltöltés kezelés
const handlePdfUpload = (event) => {
  const file = event.target.files[0];
  pdfFile.value = file;
};
</script>

<style scoped>
.create-machine {
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

input[type="text"] {
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
