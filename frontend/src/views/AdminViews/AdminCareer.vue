<template>
  <div class="admin-career">
    <div class="title">
      <h2>Admin Karrier Management Panel</h2>
    </div>
    <div class="jobs-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Name (HU)</th>
            <th>Job Name (EN)</th>
            <th>Job Description (HU)</th>
            <th>Job Description (EN)</th>
            <th>Job Time (HU)</th>
            <th>Job Time (EN)</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in jobs" :key="job.id">
            <td>{{ job.id }}</td>
            <td>{{ job.jobname_hu }}</td>
            <td>{{ job.jobname_en }}</td>
            <td>{{ job.jobdescription_hu }}</td>
            <td>{{ job.jobdescription_en }}</td>
            <td>{{ job.jobtime_hu }}</td>
            <td>{{ job.jobtime_en }}</td>
            <td class="actions-buttons">
              <button class="modify-button">
                <i class="fas fa-edit"></i>Módosítás
              </button>
              <button class="delete-button" @click="deleteJob(job.id)">
                <i class="fas fa-trash"></i>
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/admin/career-management/createjob">
      <button class="add-button">
        <i class="fas fa-plus"></i>Új állás hozzáadása
      </button></router-link
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import authService from "@/services/authService";

onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    $router.push("/admin");
  }
});

const jobs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const deleteJob = async (jobId) => {
  try {
    await axios.delete(`http://localhost:3000/api/jobs/${jobId}`);
    jobs.value = jobs.value.filter((job) => job.id !== jobId);
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.admin-career {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.jobs-table {
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

.actions-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
</style>
