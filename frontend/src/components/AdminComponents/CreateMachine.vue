<template>
  <div class="create-machine">
    <div class="title">
      <h2>Új machine létrehozása</h2>
    </div>
    <!-- Machine adatok -->
    <form @submit.prevent="createMachine">
      <div class="form-group">
        <label for="machine_name">Machine Name</label>
        <input v-model="machineData.machine_name" required />
      </div>
      <div class="form-group">
        <label for="max_height">Max Height</label>
        <input v-model="machineData.max_height" required /> m
      </div>
      <div class="form-group">
        <label for="max_weight">Max Weight</label>
        <input v-model="machineData.max_weight" required /> kg
      </div>
      <div class="form-group">
        <label for="has_sole">Has Sole</label>
        <div class="styled-select">
          <select v-model="machineData.has_sole" @change="handleSoleChange">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group" v-if="machineData.has_sole === 'Yes'">
        <label for="sole_count">Sole Count</label>
        <input v-model="machineData.sole_count" required /> db
      </div>
      <div class="form-group">
        <label for="has_basket">Has Basket</label>
        <div class="styled-select">
          <select v-model="machineData.has_basket">
            <option value="Yes">Yes</option>
            <option value="No">No</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="has_fork">Has Fork</label>
        <div class="styled-select">
          <select v-model="machineData.has_fork">
            <option value="Yes">Yes</option>
            <option value="No">No</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="is_remote">Is Remote</label>
        <div class="styled-select">
          <select v-model="machineData.is_remote">
            <option value="Yes">Yes</option>
            <option value="No">No</option></select
          ><i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="price_per_day">Price Per Day</label>
        <input v-model="machineData.price_per_day" required /> Ft
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
        <button type="submit">Machine létrehozása</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();

const machineData = ref({
  machine_name: "",
  max_height: "",
  max_weight: "",
  has_sole: "Yes",
  sole_count: "",
  has_basket: "Yes",
  has_fork: "Yes",
  is_remote: "Yes",
  price_per_day: "",
});

const imageFile = ref(null);
const imagePreviewUrl = ref(null);

const createMachine = async () => {
  const formData = new FormData();
  formData.append("machine_name", machineData.value.machine_name);
  formData.append("max_height", machineData.value.max_height);
  formData.append("max_weight", machineData.value.max_weight);
  formData.append("has_sole", machineData.value.has_sole === "Yes" ? 1 : 0);
  formData.append(
    "sole_count",
    machineData.value.has_sole === "Yes" ? machineData.value.sole_count : 0
  );
  formData.append("has_basket", machineData.value.has_basket === "Yes" ? 1 : 0);
  formData.append("has_fork", machineData.value.has_fork === "Yes" ? 1 : 0);
  formData.append("is_remote", machineData.value.is_remote === "Yes" ? 1 : 0);
  formData.append("price_per_day", machineData.value.price_per_day);
  formData.append("image", imageFile.value);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/machines",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Machine created:", response.data);
    router.push("/admin/machines-management");
  } catch (error) {
    console.error("Error creating machine:", error);
  }
};

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
