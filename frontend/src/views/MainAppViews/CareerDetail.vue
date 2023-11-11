<template>{{ job.jobname_hu }} munka oldala</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const job = ref([]);

async function fetchData() {
  try {
    const jobId = route.params.id;
    const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
    // Ha létezik munka az URL-ben megadott ID-vel, 2xx státuszú response-t kapunk, ekkor job értékének feltöltése
    if (response.status >= 200 && response.status < 300) {
      job.value = response.data;
    }
    // Ha nem létezik munka ilyen ID-vel, 404 oldalra navigálás
    else {
      router.replace("/404");
    }
  } catch (error) {
    // Ha Axios-tól kapunk 404-es státuszt, szintén 404 oldalra navigálás
    if (error.response && error.response.status === 404) {
      router.replace("/404");
    }
    // Egyéb hibakódok esetén
    else {
      console.error("Error fetching data:", error);
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>
