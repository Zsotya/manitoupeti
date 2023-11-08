<template>{{ job.jobname_hu }} munka oldala</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const job = ref([]);

async function fetchData() {
  try {
    const jobId = route.params.id;
    const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
    job.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>
