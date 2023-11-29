<template>
  <div class="admin-approved-bookings">
    <div class="title">
      <h2>Elfogadott foglalások</h2>
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
          <tr v-for="booking in approvedBookings" :key="booking.id">
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
              <button class="reject-button" @click="openReject(booking.id)">
                <i class="fas fa-times"></i>Elutasítás
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

// Adatok fetchelése
const approvedBookings = ref([]);

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/bookings/approved"
    );
    approvedBookings.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok fetchelésekor:", error);
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
    // Foglalás releváns adatainak tárolása
    const bookingToMarkPaid = approvedBookings.value.find(
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
    }
    // Archiválási hibakezelés
    else {
      console.error("Hiba a státuszmódosítás közben");
    }
  } catch (error) {
    console.error("Fizetett státusz megjelölése közbeni hiba:", error);
  }
};

// Elutasítás
// Komment ablak inicializálása "bezártnak", adatok inicializálása
const isRejectOpen = ref(false);
const rejectComment = ref("");
let selectedRejectBooking = null;

// Komment ablak megnyitása
const openReject = (bookingId) => {
  const booking = approvedBookings.value.find((b) => b.id === bookingId);
  if (booking) {
    selectedRejectBooking = booking;
    isRejectOpen.value = true;
    rejectComment.value = "";
  }
};

// Komment ablak bezárása
const closeReject = () => {
  isRejectOpen.value = false;
};

// Foglalás elutasítása
const rejectBooking = async () => {
  if (selectedRejectBooking) {
    try {
      // Státusz módosítása "Rejected"-re, komment hozzáadás
      const response = await axios.patch(
        `http://localhost:3000/api/bookings/reject/${selectedRejectBooking.id}`,
        {
          comment: rejectComment.value,
        }
      );
      // Sikeres elutasítást követően visszajelzés, email küldése
      if (response.status === 200) {
        console.log("Sikeres elutasítás");

        // Email kiküldése
        const emailResponse = await axios.post(
          "http://localhost:3000/api/rejectalMail",
          {
            bookingId: selectedRejectBooking.id,
            first_name: selectedRejectBooking.first_name,
            last_name: selectedRejectBooking.last_name,
            email: selectedRejectBooking.email,
            start_date: selectedRejectBooking.start_date,
            end_date: selectedRejectBooking.end_date,
            comment: rejectComment.value,
          }
        );
        // Sikeres email kiküldést követően visszajelzés, komment ablak becsukása, adatok ismételt lekérdezése
        if (emailResponse.status === 200) {
          console.log("Elutasítás email sikeresen elküldve");
          closeReject();
          fetchData();
        }
        // Email hibakezelés
        else {
          console.error(
            "Hiba az elutasítás email küldése közben:",
            emailResponse
          );
        }
      }
      // Elutasítási hibakezelés
      else {
        console.error("Hiba elutasítás közben:", response);
      }
    } catch (error) {
      console.error("Hiba elutasítás közben:", error);
    }
  }
};
</script>

<style scoped>
.admin-approved-bookings {
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
.reject-button {
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

.reject-button {
  background-color: red;
}

.paid-button:hover {
  background-color: #45a049;
}

.reject-button:hover {
  background-color: rgb(130, 14, 14);
}
</style>
