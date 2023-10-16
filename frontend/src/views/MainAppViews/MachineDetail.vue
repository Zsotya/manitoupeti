<template>
  <!-- testing for data fetching -->
  <h1>{{ $route.params.id }}</h1>
  <p>{{ machine.id }}</p>
  <p>{{ machine.machine_name }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const machine = ref([]);

async function fetchData() {
  try {
    const machineId = route.params.id;
    const response = await axios.get(
      `http://localhost:3000/api/machines/${machineId}`
    );
    machine.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>
