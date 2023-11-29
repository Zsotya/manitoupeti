<template>
  <div class="page-container">
    <div class="pie-chart-container">
      <div class="title">Foglalások gépenként:</div>
      <div class="chart">
        <canvas id="machine-bookings-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

// Adatok fetchelése
const fetchMachineData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/statistics/machine-bookings"
    );
    generatePieChart(response.data);
    console.log(response.data);
  } catch (err) {
    console.log("Error fetching machine data:", err);
  }
};

onMounted(() => {
  fetchMachineData();
});

// Kördiagram adatok feltöltése
const generatePieChart = (machineData) => {
  // Címkék meghatározása egyedi gépek alapján
  const labels = machineData.map(
    (entry) =>
      `${entry.machine_name} (ID:${entry.machine_id}) - ${entry.booking_count}db`
  );
  // Adatok generálása nehézgépekhez
  const data = machineData.map((entry) => entry.booking_count);
  // Diagram konfiguráció
  const pieConfig = {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: labels.map(() => getRandomColor()),
        },
      ],
    },
  };
  // Kördiagram létrehozása
  const machineBookingsChart = new Chart(
    document.getElementById("machine-bookings-chart"),
    pieConfig
  );
};

// Véletlenszerű szín generálása
const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};
</script>

<style scoped>
.page-container {
  text-align: center;
}

.pie-chart-container {
  margin-top: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.chart {
  width: 40%;
  margin: auto;
}
</style>
