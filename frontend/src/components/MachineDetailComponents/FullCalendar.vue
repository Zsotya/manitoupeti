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
import interactionPlugin from "@fullcalendar/interaction";

// const testButton = () => {
//   console.log(startDate);
//   console.log(endDate);
// };

// Jelenlegi dátum kiszámolása
const startDate = new Date().toISOString().split("T")[0];

// Következő 5 teljes hónap kiszámolása
const endDate = new Date(new Date().setMonth(new Date().getMonth() + 5))
  .toISOString()
  .split("T")[0];

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
