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
              <button class="reject-button" @click="openReject(booking.id)">
                <i class="fas fa-times"></i>Elutasítás
              </button>
              <button
                class="modify-price-button"
                @click="openModifyPrice(booking.id)"
              >
                <i class="fas fa-edit"></i>Ár módosítása
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Ár módosító ablak -->
    <div v-if="isModifyPriceOpen" class="modify-price-popup">
      <div class="content">
        <h3>
          {{ selectedModifyBooking.id }} ID-vel ellátott foglalás árának
          módosítása
        </h3>
        <p>Jelenlegi ár: {{ selectedModifyBooking.price }}Ft</p>
        <input
          v-model="newPrice"
          placeholder="Új ár (Ft)"
          type="text"
          id="newPrice"
        />Ft
        <button @click="modifyPrice">Módosítás</button>
        <button @click="closeModifyPrice">Mégse</button>
      </div>
    </div>
    <!-- Elutasítás ablak -->
    <div v-if="isRejectOpen" class="reject-popup">
      <div class="content">
        <h3>
          {{ selectedRejectBooking.id }} ID-vel ellátott foglalás elutasítása
        </h3>
        <textarea
          v-model="rejectComment"
          placeholder="Megjegyzés hozzáadása..."
        ></textarea>
        <button @click="rejectBooking(selectedRejectBooking.id)">
          Elutasítás
        </button>
        <button @click="closeReject">Mégse</button>
      </div>
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

// Funkciógombok

// Elfogadás
const approveBooking = async (bookingId) => {
  try {
    const bookingToApprove = pendingBookings.value.find(
      (booking) => booking.id === bookingId
    );
    const { first_name, last_name, email, start_date, end_date, price } =
      bookingToApprove;
    // Státusz módosítása "Approved"-ra
    const response = await axios.patch(
      `http://localhost:3000/api/bookings/approve/${bookingId}`
    );
    // Sikeres módosítást követően visszajelzés, email kiküldés
    if (response.status === 200) {
      console.log("Foglalás sikeresen elfogadva!");
      // Email kiküldése
      const emailResponse = await axios.post(
        "http://localhost:3000/api/approvalMail",
        {
          bookingId,
          first_name,
          last_name,
          email,
          start_date,
          end_date,
          price,
        }
      );
      // Email sikeres elküldése esetén visszajelzés, "Pending" státuszú foglalások ismételt lekérdezése
      if (emailResponse.status === 200) {
        console.log("Elfogadás email sikeresen elküldve");
        fetchData();
      }
      // Email hibakezelés
      else {
        console.error(
          "Hiba az email elküldése közben:",
          emailResponse.data.error
        );
      }
    }
    // Elfogadási hibakezelés
    else {
      console.error("Hiba a foglalás elfogadása közben", response.data.error);
    }
  } catch (error) {
    console.error("Elfogadási hiba:", error);
  }
};

// Elutasítás
const isRejectOpen = ref(false);
const rejectComment = ref("");
let selectedRejectBooking = null;

const openReject = (bookingId) => {
  const booking = pendingBookings.value.find((b) => b.id === bookingId);
  if (booking) {
    selectedRejectBooking = booking;
    isRejectOpen.value = true;
    rejectComment.value = "";
  }
};

const closeReject = () => {
  isRejectOpen.value = false;
};

const rejectBooking = async () => {
  if (selectedRejectBooking) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/bookings/reject/${selectedRejectBooking.id}`,
        {
          comment: rejectComment.value,
        }
      );
      if (response.status === 200) {
        console.log("Sikeres elutasítás");
        closeReject();
        fetchData();
      } else {
        console.error("Hiba elutasítás közben:", response);
      }
    } catch (error) {
      console.error("Hiba elutasítás közben:", error);
    }
  }
};

// Ár módosítás
const isModifyPriceOpen = ref(false);
const newPrice = ref("");
let selectedModifyBooking = null;

const openModifyPrice = (bookingId) => {
  const booking = pendingBookings.value.find((b) => b.id === bookingId);
  if (booking) {
    selectedModifyBooking = booking;
    isModifyPriceOpen.value = true;
    newPrice.value = "";
  }
};

const closeModifyPrice = () => {
  isModifyPriceOpen.value = false;
};

const modifyPrice = async () => {
  if (selectedModifyBooking) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/bookings/price/${selectedModifyBooking.id}`,
        {
          price: newPrice.value,
        }
      );

      if (response.status === 200) {
        selectedModifyBooking.price = newPrice.value;
        closeModifyPrice();
      } else {
        console.error("Hiba az ár módosításakor:", response);
      }
    } catch (error) {
      console.error("Hiba az ár módosításakor:", error);
    }
  }
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
  width: 120px;
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
