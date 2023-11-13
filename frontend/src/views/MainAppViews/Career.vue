<template>
  <section>
    <div class="career-cards">
      <CareerComp :jobs="jobs" />
    </div>
  </section>
</template>

<script setup>
import CareerComp from "@/components/CareerComponents/CareerComp.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

// Adatok fetchelése
const jobs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>
