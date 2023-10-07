<template>
  <div class="create-job">
    <h2>Create New Job</h2>
    <form @submit.prevent="addJob">
      <div class="form-group">
        <label for="jobname_hu">Job Name (HU):</label>
        <input
          type="text"
          id="jobname_hu"
          v-model="newJob.jobname_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobname_en">Job Name (EN):</label>
        <input
          type="text"
          id="jobname_en"
          v-model="newJob.jobname_en"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobdescription_hu">Job Description (HU):</label>
        <textarea
          id="jobdescription_hu"
          v-model="newJob.jobdescription_hu"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobdescription_en">Job Description (EN):</label>
        <textarea
          id="jobdescription_en"
          v-model="newJob.jobdescription_en"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="jobtime_hu">Job Time (HU):</label>
        <input
          type="text"
          id="jobtime_hu"
          v-model="newJob.jobtime_hu"
          required
        />
      </div>

      <div class="form-group">
        <label for="jobtime_en">Job Time (EN):</label>
        <input
          type="text"
          id="jobtime_en"
          v-model="newJob.jobtime_en"
          required
        />
      </div>

      <button type="submit" class="submit-button">Add Job</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();

const newJob = {
  jobname_hu: "",
  jobname_en: "",
  jobdescription_hu: "",
  jobdescription_en: "",
  jobtime_hu: "",
  jobtime_en: "",
};

const addJob = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/jobs", newJob);
    router.push("/admin/career-management");
  } catch (error) {
    console.error("Error adding job:", error);
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
