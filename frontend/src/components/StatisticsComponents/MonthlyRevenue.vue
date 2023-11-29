<template>
  <div class="page-container">
    <div class="title">Havi bevételek</div>
    <div class="revenues-container">
      <div class="yearly-revenues">
        <div class="sub-title">Éves bevétel:</div>
        <div
          v-for="(revenue, year) in yearlyRevenues"
          :key="year"
          class="revenue"
        >
          <div class="year">{{ year }}:</div>
          <div class="amount">{{ revenue }}Ft</div>
        </div>
      </div>
      <div class="chart">
        <canvas id="monthly-revenue-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

// Oszlop elnevezések
const labels = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

// Diagram konfiguráció inicializálása
const config = {
  type: "bar",
  data: {
    labels: labels,
    datasets: [],
  },
  options: {},
};

// Adatok fetchelése
const revenue = ref();
const yearlyRevenues = ref({});

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/statistics/monthly-revenue"
    );
    revenue.value = response.data;
    generateChartData();
    calculateYearlyRevenues();
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

onMounted(() => {
  fetchData();
});

// Diagram adatok feltöltése
const generateChartData = () => {
  // Egyedi évek kiszedése és rendezése növekvő sorrendbe
  const years = Array.from(
    new Set(revenue.value.map((entry) => entry.payment_year))
  ).sort((a, b) => a - b);
  // Minden évhez saját dataset generálása
  years.forEach((year) => {
    // Szűrés az aktuális évre
    const yearData = revenue.value.filter(
      (entry) => entry.payment_year === year
    );
    // Adatok generálása a hónapokhoz
    const data = labels.map((month) => {
      // Keresés az aktuális hónapra az aktuális évben
      const monthEntry = yearData.find(
        (entry) => entry.payment_month === labels.indexOf(month) + 1
      );
      // Ha nincs adott hónapra érték, a havi bevételre 0-t adunk vissza
      return monthEntry ? monthEntry.monthly_revenue : 0;
    });
    // Dataset hozzáadása a diagram konfigurációhoz
    config.data.datasets.push({
      label: year.toString(),
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      data: data,
    });
  });
  // Diagram létrehozása
  const monthlyRevenueChart = new Chart(
    document.getElementById("monthly-revenue-chart"),
    config
  );
};

// Éves bevételek kiszámítása
const calculateYearlyRevenues = () => {
  yearlyRevenues.value = revenue.value.reduce((result, entry) => {
    const year = entry.payment_year;
    const monthlyRevenue = Number(entry.monthly_revenue);
    result[year] = (result[year] || 0) + monthlyRevenue;
    return result;
  }, {});
};

// Véletlenszerű szín generálása az oszlopok színezéséhez
const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}

.revenues-container {
  display: flex;
}

.chart {
  width: 80%;
  margin: 30px auto;
}

.yearly-revenues {
  margin-top: 44px;
  margin-left: 24px;
}

.sub-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.revenue {
  display: flex;
  margin-bottom: 12px;
}

.year {
  font-size: 18px;
  font-weight: bold;
}

.amount {
  font-size: 18px;
  margin-left: 12px;
}
</style>
