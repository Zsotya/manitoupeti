<template>
  <div class="create-paragraph">
    <div class="title">
      <h2>Új paragraph létrehozása</h2>
    </div>
    <!-- Paragraph adatok -->
    <form @submit.prevent="createParagraph">
      <div class="form-group">
        <label for="title_hu">Title (HU)</label>
        <input v-model="paragraphData.title_hu" required />
      </div>
      <div class="form-group">
        <label for="title_en">Title (EN)</label>
        <input v-model="paragraphData.title_en" required />
      </div>
      <div class="form-group">
        <label for="content_hu">Content (HU)</label>
        <textarea v-model="paragraphData.content_hu" required></textarea>
      </div>
      <div class="form-group">
        <label for="content_en">Content (EN)</label>
        <textarea v-model="paragraphData.content_en" required></textarea>
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
        <button type="submit">Paragraph létrehozása</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();

const paragraphData = ref({
  title_hu: "",
  title_en: "",
  content_hu: "",
  content_en: "",
});

const imageFile = ref(null);
const imagePreviewUrl = ref(null);

const createParagraph = async () => {
  const formData = new FormData();
  formData.append("title_hu", paragraphData.value.title_hu);
  formData.append("title_en", paragraphData.value.title_en);
  formData.append("content_hu", paragraphData.value.content_hu);
  formData.append("content_en", paragraphData.value.content_en);
  formData.append("image", imageFile.value);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/paragraphs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Paragraph created:", response.data);
    router.push("/admin/paragraph-management");
  } catch (error) {
    console.error("Error creating film:", error);
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
.create-paragraph {
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
textarea {
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
</style>
