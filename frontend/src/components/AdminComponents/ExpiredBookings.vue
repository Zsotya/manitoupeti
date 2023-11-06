<template>
  <div class="admin-expired-bookings">
    <div class="title">
      <h2>Lejárt határidejű foglalások</h2>
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
            <th>Módosítás dátuma</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in expiredBookings" :key="booking.id">
            <td>{{ booking.id }}</td>
            <td>{{ booking.machine_id }}</td>
            <td>{{ `${booking.first_name} ${booking.last_name}` }}</td>
            <td>{{ booking.email }}</td>
            <td>{{ booking.phone_number }}</td>
            <td>{{ booking.location }}</td>
            <td>{{ formatDateRange(booking.start_date, booking.end_date) }}</td>
            <td>{{ booking.price }}Ft</td>
            <td>{{ formatDate(booking.updated_at) }}</td>
            <td class="actions-buttons">
              <button class="paid-button" @click="markAsPaid(booking.id)">
                <i class="fas fa-check"></i>Fizetve
              </button>
              <button class="expired-button" @click="archive(booking.id)">
                <i class="fas fa-times"></i>Archiválás
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

const expiredBookings = ref([]);

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookings/expired"
    );
    expiredBookings.value = response.data;
  } catch (error) {
    console.error("Error fetching expired bookings:", error);
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

// Módosítás dátumának "YYYY.MM.DD. HH:MM" formátumra formázás
const formatDate = (modifiedDate) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(modifiedDate);
  return date.toLocaleString("hu-HU", options);
};

// Funkciógombok

// Fizetve

const markAsPaid = async (bookingId) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/bookings/markAsPaid/${bookingId}`
    );
    if (response.status === 200) {
      console.log("Booking marked as paid successfully!");
      fetchData();
    } else {
      console.error("Failed to mark the booking as paid");
    }
  } catch (error) {
    console.error("Error marking the booking paid:", error);
  }
};

// Lejárt

const archive = async (bookingId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/bookings/archive/${bookingId}`
    );
    if (response.status === 200) {
      console.log("Booking has been archived successfully!");
      fetchData();
    } else {
      console.error("Failed to archive booking.");
    }
  } catch (error) {
    console.error("Error marking the booking as archived:", error);
  }
};
</script>

<style scoped>
.admin-expired-bookings {
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

.paid-button,
.expired-button {
  padding: 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  display: flex;
  gap: 4px;
}

.paid-button {
  background-color: #4caf50;
}

.expired-button {
  background-color: red;
}

.paid-button:hover {
  background-color: #45a049;
}

.expired-button:hover {
  background-color: rgb(130, 14, 14);
}
</style>
