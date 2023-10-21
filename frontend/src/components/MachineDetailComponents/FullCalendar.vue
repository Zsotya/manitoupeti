<template>
  <div class="fullcalendar-container">
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
  <!-- <button @click="testButton">testbutton</button> -->
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

// const testButton = () => {
//   console.log("Pending:", pendingData);
//   console.log("Accepted:", acceptedData);
//   console.log("Paid:", paidData);
// };

// Jelenlegi dátum kiszámolása
const startDate = new Date().toISOString().split("T")[0];

// 5 hónap múlva levő dátum kiszámolása
const endDate = new Date(new Date().setMonth(new Date().getMonth() + 5))
  .toISOString()
  .split("T")[0];

// FullCalendar konfigurálása
const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  height: 850,
  validRange: {
    start: startDate,
    end: endDate,
  },
  events: [],
};

// Adatok lekérdezése
const getBookingData = async (status) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/${status}Bookings?machine_id=1`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting ${status} bookings:`, error);
    return [];
  }
};

// Rekordok tárolása
const pendingData = getBookingData("pending");
const acceptedData = getBookingData("accepted");
const paidData = getBookingData("paid");
</script>

<style scoped>
.fullcalendar-container {
  background-color: #e8e6e6;
  padding-bottom: 30px;
}
.calendar-container {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
}
</style>
