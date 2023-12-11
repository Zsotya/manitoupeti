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
              <button class="paid-button" @click="openPaid(booking.id)">
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
    <!-- Fizetettnek jelölés ablak -->
    <div class="overlay" v-if="isPaidOpen">
      <div class="popup">
        <div class="message">
          Biztos fizetettnek szeretnéd megjelölni a megrendelést?
        </div>
        <div class="buttons">
          <button class="confirm-button" @click="markAsPaid(paidBookingId)">
            Igen
          </button>
          <button class="cancel-button" @click="closePaid">Nem</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import io from "socket.io-client";

// WebSocket
const socket = io("http://localhost:3000");

// Adatok fetchelése
const expiredBookings = ref([]);

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookings/expired"
    );
    expiredBookings.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelésekor:", error);
  }
}

onMounted(() => {
  fetchData();
  socket.on("bookingsUpdated", () => {
    fetchData();
  });
});

// Időintervallum YYYY-MM-DD formátumra formázás (ebben az esetben az óra,perc irreleváns)
const formatDateRange = (startDate, endDate) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedStartDate = new Date(startDate).toLocaleDateString(
    undefined,
    options
  );
  const formattedEndDate = new Date(endDate).toLocaleDateString(
    undefined,
    options
  );

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

/* Funkciógombok */
/* Fizetve */

// Inicializálás
const isPaidOpen = ref(false);
const paidBookingId = ref(null);

// Ablak megnyitása
const openPaid = (bookingId) => {
  paidBookingId.value = bookingId;
  isPaidOpen.value = true;
};

// Ablak bezárása
const closePaid = () => {
  paidBookingId.value = null;
  isPaidOpen.value = false;
};

// Megjelölés fizetettnek
const markAsPaid = async (bookingId) => {
  try {
    // Foglalás releváns adatainak tárolása
    const bookingToMarkPaid = expiredBookings.value.find(
      (booking) => booking.id === bookingId
    );
    const { first_name, last_name, email, start_date, end_date } =
      bookingToMarkPaid;
    // Státusz módosítása "Paid"-re
    const response = await axios.patch(
      `http://localhost:3000/api/bookings/markAsPaid/${bookingId}`
    );
    // Sikeres módosítást követően visszajelzés, email kiküldése
    if (response.status === 200) {
      console.log("Foglalás státusza sikeresen módosult 'Paid' státuszra!");
      // Email küldés
      const emailResponse = await axios.post(
        "http://localhost:3000/api/paidMail",
        {
          bookingId,
          first_name,
          last_name,
          email,
          start_date,
          end_date,
        }
      );
      // Email sikeres elküldés esetén visszajelzés, újbóli lekérdezés
      if (emailResponse.status === 200) {
        console.log("Fizetve email sikeresen elküldve");
        fetchData();
      }
      // Email hibakezelés
      else {
        console.error("Hiba a fizetve email kiküldése során:", emailResponse);
      }
    } else {
      console.error("Hiba a státuszmódosítás közben");
    }
  } catch (error) {
    console.error("Fizetett státusz megjelölése közbeni hiba:", error);
  } finally {
    closePaid();
  }
};

// Lejárt
const archive = async (bookingId) => {
  try {
    // Foglalás releváns adatainak tárolása
    const bookingToMarkExpired = expiredBookings.value.find(
      (booking) => booking.id === bookingId
    );
    const { first_name, last_name, email, start_date, end_date } =
      bookingToMarkExpired;
    // Foglalás archiválása
    const response = await axios.post(
      `http://localhost:3000/api/bookings/archive/${bookingId}`
    );
    // Sikeres archiválást követően visszajelzés, email küldés
    if (response.status === 200) {
      console.log("Foglalás sikeresen archiválva!");
      // Email küldés
      const emailResponse = await axios.post(
        "http://localhost:3000/api/paidMail",
        {
          bookingId,
          first_name,
          last_name,
          email,
          start_date,
          end_date,
        }
      );
      // Email sikeres elküldés esetén visszajelzés, újbóli lekérdezés
      if (emailResponse.status === 200) {
        console.log("Lejárva email sikeresen elküldve");
        fetchData();
      }
      // Email hibakezelés
      else {
        console.error("Hiba a lejárva email kiküldése során:", emailResponse);
      }
    }
    // Archiválási hibakezelés
    else {
      console.error("Hiba az archiválás közben");
    }
  } catch (error) {
    console.error("Hiba a foglalás archiválása közben:", error);
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #ffffff;
  padding: 50px;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.message {
  font-size: 18px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  margin: 0 14px;
  font-size: 16px;
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover,
.cancel-button:hover {
  background-color: lightgray;
}
</style>
