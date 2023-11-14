<template>
  <div class="fullcalendar-container" :class="{ 'dark-mode': darkMode }">
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color today"></div>
        <div class="legend-text">Today</div>
      </div>
      <div class="legend-item">
        <div class="legend-color potentially-occupied"></div>
        <div class="legend-text">Potentially Occupied</div>
      </div>
      <div class="legend-item">
        <div class="legend-color occupied"></div>
        <div class="legend-text">Occupied</div>
      </div>
      <div class="legend-item">
        <div class="legend-color available"></div>
        <div class="legend-text">Available</div>
      </div>
    </div>
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

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

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
      title: "",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "rgba(255, 165, 0, 1)",
      display: "background",
      color: "black",
    })),

    ...approvedData.map((booking) => ({
      title: "",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "rgba(255, 165, 0, 1)",
      display: "background",
    })),

    ...paidData.map((booking) => ({
      title: "",
      start: formatStart(new Date(booking.start_date)),
      end: formatEnd(new Date(booking.end_date)),
      backgroundColor: "rgba(255, 0, 0, 1)",
      display: "background",
    })),
  ];
  events.value = eventsData;
};

// FullCalendar konfigurálása

const language = store.getters.currentLanguage;

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
  locale: language === "hu" ? "hu" : "en",
};
// Locale esetén a dokumentációban is fel van tűntetve, hogy csak page reload után van lehetőség frissítésre

// Kezdeti inicializáláskor a calendarOptions.events értéke undefined lenne, mivel hamarabb renderel, mint hogy a GET request megtörténne.
// Éppen ezért watchert használunk, hogy "rákényszerítsük a FullCalendar-t", hogy re-rendereljen, ha változik az adat

onMounted(() => {
  createCalendarEvents();
});

watch(events, (newEvents) => {
  calendarOptions.events = newEvents;
});
</script>

<style scoped>
@import "@/fullcalendar.css";
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

/* Legend styles */
.legend {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
}

.legend-item {
  margin-right: 30px;
  display: flex;
  align-items: center;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 1px solid black;
}

.today {
  background-color: rgb(160, 209, 226);
}

.available {
  background-color: #fff;
  transition: background-color 0.5s;
}

.potentially-occupied {
  background-color: rgba(255, 165, 0, 1);
}

.occupied {
  background-color: red;
}

.legend-text {
  color: black;
  transition: color 0.5s;
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

.fullcalendar-container.dark-mode .legend-text {
  color: white;
}

.fullcalendar-container.dark-mode .available {
  background-color: #787878;
}
</style>
