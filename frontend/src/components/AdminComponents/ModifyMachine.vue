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
        <label for="machine_name">Van talp?</label>
        <div class="styled-select">
          <select v-model="machineData.has_sole">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="machine_name">Talpak száma</label>
        <input v-model="machineData.sole_count" required />
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
        <label for="machine_name">Távirányítható</label>
        <div class="styled-select">
          <select v-model="machineData.is_remote">
            <option value="Yes">Igen</option>
            <option value="No">Nem</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="machine_name">Napi ár</label>
        <input v-model="machineData.price_per_day" required />
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
  has_sole: "",
  sole_count: "",
  has_basket: "",
  has_fork: "",
  is_remote: "",
  price_per_day: "",
  image: null,
});

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
    has_sole: data.has_sole ? "Yes" : "No",
    sole_count: data.sole_count,
    has_basket: data.has_basket ? "Yes" : "No",
    has_fork: data.has_fork ? "Yes" : "No",
    is_remote: data.is_remote ? "Yes" : "No",
    price_per_day: data.price_per_day,
    image: data.image_url,
  };

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

// Módosítás
const modifyMachine = async () => {
  // Form adatok
  const formData = new FormData();
  formData.append("machine_name", machineData.value.machine_name);
  formData.append("max_height", machineData.value.max_height);
  formData.append("max_weight", machineData.value.max_weight);
  formData.append("has_sole", machineData.value.has_sole === "Yes" ? 1 : 0);
  formData.append("sole_count", machineData.value.sole_count);
  formData.append("has_basket", machineData.value.has_basket === "Yes" ? 1 : 0);
  formData.append("has_fork", machineData.value.has_fork === "Yes" ? 1 : 0);
  formData.append("is_remote", machineData.value.is_remote === "Yes" ? 1 : 0);
  formData.append("price_per_day", machineData.value.price_per_day);
  if (imageFile.value) {
    formData.append("image", imageFile.value);
  } else {
    formData.append("image", machineData.value.image); // Ha nem került új fájl kiválasztásra, akkor a régi URL-t kapja
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
