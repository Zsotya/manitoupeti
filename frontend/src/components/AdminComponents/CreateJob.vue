<template>
  <div class="create-job">
    <h2>Új állás létrehozása</h2>
    <form @submit.prevent="addJob">
      <div class="form-group">
        <label for="jobname_hu">Állás neve (HU):</label>
        <input
          type="text"
          id="jobname_hu"
          v-model="newJob.jobname_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobname_en">Állás neve (EN):</label>
        <input
          type="text"
          id="jobname_en"
          v-model="newJob.jobname_en"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobdescription_hu">Állás leírása (HU):</label>
        <textarea
          id="jobdescription_hu"
          v-model="newJob.jobdescription_hu"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobdescription_en">Állás leírása (EN):</label>
        <textarea
          id="jobdescription_en"
          v-model="newJob.jobdescription_en"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobtime_hu">Munkaidő (HU):</label>
        <input
          type="text"
          id="jobtime_hu"
          v-model="newJob.jobtime_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobtime_en">Munkaidő (EN):</label>
        <input
          type="text"
          id="jobtime_en"
          v-model="newJob.jobtime_en"
          required
        />
      </div>

      <button type="submit" class="submit-button">Munka létrehozása</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();

// Adatok inicializálása
const newJob = {
  jobname_hu: "",
  jobname_en: "",
  jobdescription_hu: "",
  jobdescription_en: "",
  jobtime_hu: "",
  jobtime_en: "",
};

// Létrehozás
const addJob = async () => {
  try {
    // POST request küldése
    const response = await axios.post("http://localhost:3000/api/jobs", newJob);
    // Sikeres létrehozás esetén navigálás
    console.log("Állás sikeresen létrehozva:", response.data);
    router.push("/admin/career-management");
  } catch (error) {
    console.error("Hiba az állás létrehozása közben:", error);
  }
};
</script>

<style scoped>
.create-job {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  padding-bottom: 20px;
}

form {
  width: 40%;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
}

.submit-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
