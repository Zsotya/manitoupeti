<template>
  <div class="modify-job">
    <h2>Állás módosítása</h2>
    <form @submit.prevent="modifyJob">
      <div class="form-group">
        <label for="jobname_hu">Állás neve (HU):</label>
        <input
          type="text"
          id="jobname_hu"
          v-model="jobData.jobname_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobname_en">Állás neve (EN):</label>
        <input
          type="text"
          id="jobname_en"
          v-model="jobData.jobname_en"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobdescription_hu">Állás leírása (HU):</label>
        <textarea
          id="jobdescription_hu"
          v-model="jobData.jobdescription_hu"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobdescription_en">Állás leírása (EN):</label>
        <textarea
          id="jobdescription_en"
          v-model="jobData.jobdescription_en"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobtime_hu">Munkaidő (HU):</label>
        <input
          type="text"
          id="jobtime_hu"
          v-model="jobData.jobtime_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobtime_en">Munkaidő (EN):</label>
        <input
          type="text"
          id="jobtime_en"
          v-model="jobData.jobtime_en"
          required
        />
      </div>

      <button type="submit" class="submit-button">Állás módosítása</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

// Adatok inicializálása
const route = useRoute();
const router = useRouter();

const jobData = ref({
  jobname_hu: "",
  jobname_en: "",
  jobdescription_hu: "",
  jobdescription_en: "",
  jobtime_hu: "",
  jobtime_en: "",
});

// Adatok beállítása a régi értékre
onMounted(async () => {
  const jobId = route.params.id;
  const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
  const data = response.data;
  // Módosítás előtti értékek
  jobData.value = {
    jobname_hu: data.jobname_hu,
    jobname_en: data.jobname_en,
    jobdescription_hu: data.jobdescription_hu,
    jobdescription_en: data.jobdescription_en,
    jobtime_hu: data.jobtime_hu,
    jobtime_en: data.jobtime_en,
  };
});

// Módosítás
const modifyJob = async () => {
  try {
    // Azonosító meghatározása
    const jobId = route.params.id;
    // PUT request küldése
    const response = await axios.put(
      `http://localhost:3000/api/jobs/${jobId}`,
      jobData
    );
    // Sikeres küldés esetén navigálás
    router.push("/admin/career-management");
  } catch (error) {
    console.error("Hiba az állás módosítása közben:", error);
  }
};
</script>

<style scoped>
.modify-job {
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
