<template>
  <div class="fullcalendar-container">
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Jelenlegi dátum kiszámolása
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const currentDay = currentDate.getDate().toString().padStart(2, "0");

const startDate = `${currentYear}-${currentMonth}-${currentDay}`;

// Következő 5 teljes hónap kiszámolása
const futureDate = new Date();
futureDate.setMonth(currentDate.getMonth() + 5);
const futureYear = futureDate.getFullYear();
const futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, "0");
const lastDayOfMonth =
  new Date(futureYear, futureDate.getMonth() + 1, 0).getDate() + 1;

const endDate = `${futureYear}-${futureMonth}-${lastDayOfMonth}`;

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  height: 850,
  validRange: {
    start: startDate,
    end: endDate,
  },
  events: [
    {
      title: "Available",
      start: "2023-10-17",
      end: "2023-11-30",
      backgroundColor: "green",
      display: "background",
    },
    {
      title: "Occupied",
      start: "2023-10-19",
      end: "2023-10-24",
      display: "background",
      backgroundColor: "orange",
    },
  ],
};
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
