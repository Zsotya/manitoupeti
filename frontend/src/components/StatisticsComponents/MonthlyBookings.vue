<template>
  <div class="page-container">
    <div class="title">Havi foglalások darabszáma</div>
    <div class="bookings-container">
      <div class="yearly-bookings">
        <div class="sub-title">Éves foglalások darabszáma:</div>
        <div
          v-for="(bookings, year) in yearlyBookings"
          :key="year"
          class="bookings"
        >
          <div class="year">{{ year }}:</div>
          <div class="count">{{ bookings }}db</div>
        </div>
      </div>
      <div class="chart">
        <canvas id="monthly-bookings-chart"></canvas>
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
  options: {
    // Decimális értékek kiküszöbölésére
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
};

// Adatok fetchelése
const bookings = ref();
const yearlyBookings = ref({});

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/statistics/monthly-bookings"
    );
    bookings.value = response.data;
    generateChartData();
    calculateYearlyBookings();
    console.log(bookings.value);
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
    new Set(bookings.value.map((entry) => entry.booking_year))
  ).sort((a, b) => a - b);
  // Minden évhez saját dataset generálása
  years.forEach((year) => {
    // Szűrés az aktuális évre
    const yearData = bookings.value.filter(
      (entry) => entry.booking_year === year
    );
    // Adatok generálása a hónapokhoz
    const data = labels.map((month) => {
      // Keresés az aktuális hónapra az aktuális évben
      const monthEntry = yearData.find(
        (entry) => entry.booking_month === labels.indexOf(month) + 1
      );
      // Ha nincs adott hónapra érték, a havi foglalás darabszámra 0-t adunk vissza
      return monthEntry ? monthEntry.monthly_bookings : 0;
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
  const monthlyBookingsChart = new Chart(
    document.getElementById("monthly-bookings-chart"),
    config
  );
};

// Éves foglalások darabszámának kiszámítása
const calculateYearlyBookings = () => {
  yearlyBookings.value = bookings.value.reduce((result, entry) => {
    const year = entry.booking_year;
    const monthlyBookings = Number(entry.monthly_bookings);
    result[year] = (result[year] || 0) + monthlyBookings;
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

.bookings-container {
  display: flex;
}

.chart {
  width: 80%;
  margin: 30px auto;
}

.yearly-bookings {
  margin-top: 44px;
  margin-left: 24px;
}

.sub-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 6px;
  width: 14ch;
}

.bookings {
  display: flex;
  margin-bottom: 12px;
}

.year {
  font-size: 18px;
  font-weight: bold;
}

.count {
  font-size: 18px;
  margin-left: 12px;
}
</style>
