<template>
  <div class="admin-pending-bookings">
    <div class="title">
      <h2>Függőben lévő foglalások</h2>
    </div>
    <div class="bookings-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nehézgép ID</th>
            <th>Teljes név</th>
            <th>E-mail</th>
            <th>Telefonszám</th>
            <th>Helyszín</th>
            <th>Időintervallum</th>
            <th>Ár</th>
            <th>Létrehozás dátuma</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in pendingBookings" :key="booking.id">
            <td>{{ booking.id }}</td>
            <td>{{ booking.machine_id }}</td>
            <td>{{ `${booking.first_name} ${booking.last_name}` }}</td>
            <td>{{ booking.email }}</td>
            <td>{{ booking.phone_number }}</td>
            <td>{{ booking.location }}</td>
            <td>{{ formatDateRange(booking.start_date, booking.end_date) }}</td>
            <td>{{ booking.price }}Ft</td>
            <td>{{ formatDate(booking.created_at) }}</td>
            <td class="actions-buttons">
              <button
                class="approve-button"
                @click="approveBooking(booking.id)"
              >
                <i class="fas fa-check"></i>Jóváhagyás
              </button>
              <button class="reject-button" @click="rejectBooking(booking.id)">
                <i class="fas fa-times"></i>Elutasítás
              </button>
              <button
                class="modify-price-button"
                @click="modifyPrice(booking.id)"
              >
                <i class="fas fa-edit"></i>Ár módosítása
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const pendingBookings = ref([]);

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookings/pending"
    );
    pendingBookings.value = response.data;
  } catch (error) {
    console.error("Error fetching pending bookings:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Időintervallum YYYY-MM-DD formátumra formázás (ebben az esetben az óra,perc irreleváns)
const formatDateRange = (startDate, endDate) => {
  const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
  const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

  return `${formattedStartDate} - ${formattedEndDate}`;
};

// Létrehozás dátumának "YYYY.MM.DD. HH:MM" formátumra formázás
const formatDate = (updatedDate) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(updatedDate);
  return date.toLocaleString("hu-HU", options);
};
</script>

<style scoped>
.admin-pending-bookings {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.bookings-table {
  margin-top: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.actions-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.approve-button,
.reject-button,
.modify-price-button {
  padding: 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  display: flex;
  gap: 4px;
}

.approve-button {
  background-color: #4caf50;
}

.reject-button {
  background-color: red;
}

.modify-price-button {
  background-color: #007bff;
}

.approve-button:hover {
  background-color: #45a049;
}

.reject-button:hover {
  background-color: rgb(130, 14, 14);
}

.modify-price-button:hover {
  background-color: #0056b3;
}
</style>
