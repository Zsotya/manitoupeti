<template>
  <div class="fullcalendar-container" :class="{ 'dark-mode': darkMode }">
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

// Jelenlegi dátum kiszámolása és formázása
const startDate = new Date().toISOString().split("T")[0];

// 5 hónap múlva levő dátum kiszámolása és formázása
const endDate = new Date(new Date().setMonth(new Date().getMonth() + 5))
  .toISOString()
  .split("T")[0];

// GET request - Adatok lekérdezése
const route = useRoute();
const machineId = route.params.id;

const getBookingData = async (status) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/${status}BookingsMachine?machine_id=${machineId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting ${status} bookings:`, error);
    return [];
  }
};

// Események feltöltése adatokkal
const events = ref([]);
const createCalendarEvents = async () => {
  const pendingData = await getBookingData("pending");
  const paidData = await getBookingData("paid");
  const approvedData = await getBookingData("approved");
  // Dátumok formázása. Azért külön, mert end esetén +1 napot hozzá kell adni (FullCalendar működése miatt..)
  function formatStart(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function formatEnd(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Adatok feldolgozása és FullCalendar-nak megfelelő formátummá konvertálása
  // eventsData.end esetén +1 napot hozzáadunk, különben nem megfelelő date-ranget színez
  const eventsData = [
    ...pendingData.map((booking) => ({
      title: "Pending",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "orange",
      display: "background",
    })),

    ...approvedData.map((booking) => ({
      title: "Approved",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "orange",
      display: "background",
    })),

    ...paidData.map((booking) => ({
      title: "Paid",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "red",
      display: "background",
    })),
  ];
  events.value = eventsData;
};

// FullCalendar konfigurálása

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  height: 850,
  validRange: {
    start: startDate,
    end: endDate,
  },
  events: events,
  firstDay: 1,
  showNonCurrentDates: false,
  fixedWeekCount: false,
};

// Kezdeti inicializáláskor a calendarOptions.events értéke undefined lenne, mivel hamarabb renderel, mint hogy a GET request megtörténne.
// Éppen ezért watchert használunk, hogy "rákényszerítsük a FullCalendar-t", hogy re-rendereljen, ha változik az adat

onMounted(() => {
  createCalendarEvents();
});

watch(events, (newEvents) => {
  calendarOptions.events = newEvents;
});

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.fullcalendar-container {
  background-color: #e8e6e6;
  padding-bottom: 30px;
  transition: background-color 0.5s;
}
.calendar-container {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  transition: background-color 0.5s, border 0.5s, color 0.5s;
}

/* Dark mode */
.fullcalendar-container.dark-mode {
  background-color: #1a1a1a;
}
.fullcalendar-container.dark-mode .calendar-container {
  border: 2px solid white;
  background-color: #454545;
  color: white;
}
</style>
