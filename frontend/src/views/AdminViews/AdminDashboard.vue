<template>
  <div class="page-container">
    <!-- Aktív megrendelések darabszáma -->
    <div class="booking-counts-container">
      <h2 class="booking-count-header">Aktív megrendelések</h2>
      <div class="booking-counts">
        <div class="count-item">
          <p>Függőben lévő foglalások:</p>
          <span>{{ bookingCounts.pending }}</span>
        </div>
        <div class="count-item">
          <p>Elfogadott foglalások:</p>
          <span>{{ bookingCounts.approved }}</span>
        </div>
        <div class="count-item">
          <p>Lejárt foglalások:</p>
          <span>{{ bookingCounts.expired }}</span>
        </div>
      </div>
    </div>
    <!-- Fizetett aktív megrendelések, adatok -->
    <div class="paid-bookings-section">
      <h3 class="paid-bookings-header">Fizetett aktív megrendelések</h3>
      <ul class="paid-bookings-list">
        <li
          v-for="booking in paidBookings"
          :key="booking.id"
          class="paid-booking-item"
        >
          <div class="booking-info">
            <p class="booking-machine">
              Nehézgép neve: {{ booking.machine_name }} (Nehézgép ID:
              {{ booking.machine_id }})
            </p>
            <p class="booking-name">
              Név: {{ booking.last_name }} {{ booking.first_name }}
            </p>
            <p class="booking-location">Helyszín: {{ booking.location }}</p>
            <p class="booking-date">
              Időpont: {{ formatDate(booking.start_date) }} -
              {{ formatDate(booking.end_date) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import authService from "@/services/authService";
import { useRouter } from "vue-router";

// Autentikáció (token validálása)
const router = useRouter();
onMounted(() => {
  const token = localStorage.getItem("token");
  if (authService.isTokenExpired(token)) {
    authService.logoutUser();
    router.push("/admin");
  }
});

// Adatok inicializálása
const bookingCounts = ref({
  pending: 0,
  approved: 0,
  expired: 0,
});

const paidBookings = ref([]);

// Adatok fetchelése
const fetchBookingCounts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookingCountsAllMachines"
    );
    bookingCounts.value = response.data;
  } catch (error) {
    console.error("Hiba a megrendelési darabszámok lekérdezése közben:", error);
  }
};

const fetchActivePaidBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookings/activePaid"
    );
    paidBookings.value = response.data;
  } catch (error) {
    console.error("Hiba a fizetett megrendelések lekérdezése közben:", error);
  }
};

onMounted(() => {
  fetchBookingCounts();
  fetchActivePaidBookings();
});

// Dátum formázása
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("hu-HU", options).replace(/\//g, ".");
};
</script>

<style scoped>
.page-container {
  background-color: #f0f0f0;
  min-height: 100vh;
}
.booking-counts-container {
  padding: 10px;
  text-align: center;
}

.booking-count-header {
  font-size: 24px;
  padding-top: 20px;
}

.booking-counts {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin: 20px;
}

.count-item {
  text-align: center;
}

.count-item p {
  margin-bottom: 5px;
  font-weight: bold;
}

.count-item span {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.paid-bookings-section {
  margin-top: 20px;
}

.paid-bookings-header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.paid-bookings-list {
  list-style-type: none;
  padding: 0;
}

.paid-booking-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.booking-info {
  font-size: 16px;
}

.booking-machine,
.booking-name,
.booking-location,
.booking-date {
  margin: 5px 0;
  color: #333;
}
</style>
