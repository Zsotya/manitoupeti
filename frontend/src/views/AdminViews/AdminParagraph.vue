<template>
  <div class="admin-paragraphs">
    <div class="title">
      <h2>Admin Paragraph Management Panel</h2>
    </div>
    <div class="paragraphs-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title (HU)</th>
            <th>Title (EN)</th>
            <th>Content (HU)</th>
            <th>Content (EN)</th>
            <th>Kép</th>
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
                :src="paragraph.image_url"
                alt="paragraph.image_url"
                class="thumbnail"
              />
            </td>
            <td class="actions-buttons">
              <button class="modify-button">
                <i class="fas fa-edit"></i>Módosítás
              </button>
              <button
                class="delete-button"
                @click="deleteParagraph(paragraph.id)"
              >
                <i class="fas fa-trash"></i>
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/admin/paragraph-management/createparagraph">
      <button class="add-button">
        <i class="fas fa-plus"></i>Új paragraph hozzáadása
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import authService from "@/services/authService";
import axios from "axios";

onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});

const paragraphs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/paragraphs");
    paragraphs.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const deleteParagraph = async (paragraphId) => {
  try {
    await axios.delete(`http://localhost:3000/api/paragraphs/${paragraphId}`);
    paragraphs.value = paragraphs.value.filter(
      (paragraph) => paragraph.id !== paragraphId
    );
  } catch (error) {
    console.error("Error deleting paragraph:", error);
  }
};

onMounted(() => {
  fetchData();
});
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
</style>
