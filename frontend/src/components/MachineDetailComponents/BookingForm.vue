<template>
  <div class="form-wrap" :class="{ 'dark-mode': darkMode }">
    <div class="booking-form">
      <h1>{{ $t("machinesBooking") }}</h1>

      <!-- Időintervallum kiválasztása -->
      <form @submit.prevent="submitBooking">
        <DatePicker
          v-model="date"
          range
          :format="customFormat"
          no-disabled-range
          :disabled-dates="disabledDates"
          :min-date="new Date()"
          :max-date="new Date(new Date().setMonth(new Date().getMonth() + 5))"
          :enable-time-picker="false"
          :dark="darkMode"
          required
        />

        <!-- Megrendelő információk -->
        <div class="user-info">
          <div class="input-group">
            <label for="last-name">{{ $t("lastName") }}:</label>
            <input
              type="text"
              id="last-name"
              v-model="last_name"
              autocomplete="on"
              required
            />
          </div>
          <div class="input-group">
            <label for="first-name">{{ $t("firstName") }}:</label>
            <input
              type="text"
              id="first-name"
              v-model="first_name"
              autocomplete="on"
              required
            />
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              autocomplete="on"
              required
            />
          </div>
          <div class="input-group">
            <label for="phone">{{ $t("phone") }}:</label>
            <input
              type="tel"
              id="phone"
              v-model="phone_number"
              autocomplete="on"
              required
            />
          </div>
          <div>
            <label for="location">{{ $t("location") }}:</label>
            <input type="text" id="location" v-model="location" required />
          </div>
        </div>

        <!-- Végösszeg kiszámolása -->
        <div class="total-price">
          <p>{{ $t("machinesFormPrice") }}: {{ totalPrice }} Ft</p>
        </div>
        <div class="price-note" v-if="date && date[0] && date[1]">
          <p>
            {{ $t("machinesFormInform") }}
          </p>
        </div>
        <button class="submit-button" type="submit">
          {{ $t("machinesFormSubmit") }}
        </button>
      </form>
    </div>
    <!-- Visszajelzés a sikeres megrendelésről -->
    <!-- Sikeres megrendelés -->
    <div v-if="isSent" class="overlay">
      <div class="popup">
        <div class="content">
          <div class="popup-result">
            {{ $t("bookingFormPopupSuccess") }}
          </div>
        </div>
        <div class="popup-button">
          <button @click="cancelPopup" class="cancel-button">OK</button>
        </div>
      </div>
    </div>
    <!-- Sikertelen megrendelés -->
    <div v-if="notSent" class="overlay">
      <div class="popup">
        <div class="content">
          <div class="popup-result">{{ $t("bookingFormPopupError") }}</div>
          <div v-if="isError" class="popup-message">
            {{ $t("popupServerError") }}
          </div>
        </div>
        <div class="popup-button">
          <button @click="cancelPopup" class="cancel-button">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import io from "socket.io-client";

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// WebSocket
const socket = io("http://localhost:3000");

const props = defineProps(["machine"]);
const date = ref([new Date(), null]);

// Datepicker formátum
const startDate = ref();
const endDate = ref();
const message = ref("");

const customFormat = (date) => {
  const formatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  startDate.value = date[0];
  endDate.value = date[1];
  const language = store.state.language;

  if (startDate.value && endDate.value) {
    const formattedStartDate = startDate.value.toLocaleDateString(
      "hu-HU",
      formatOptions
    );
    const formattedEndDate = endDate.value.toLocaleDateString(
      "hu-HU",
      formatOptions
    );
    message.value =
      language === "hu"
        ? `A választott időintervallum: ${formattedStartDate} - ${formattedEndDate}`
        : `The selected date range: ${formattedStartDate} - ${formattedEndDate}`;
  } else {
    message.value =
      language === "hu"
        ? "Válasszon időintervallumot..."
        : "Please select date range...";
  }

  return message.value;
};

// Végösszeg kiszámítása
const totalPrice = computed(() => {
  const startDay = date.value ? date.value[0] : null;
  const endDay = date.value ? date.value[1] : null;
  if (startDay && endDay) {
    const daysDifference = Math.ceil(
      (endDay - startDay + 1) / (1000 * 60 * 60 * 24)
    );
    return daysDifference * props.machine.price_per_day;
  }
  return 0;
});

/* POST kérés előkészítése */

// Form elemek
const last_name = ref("");
const first_name = ref("");
const email = ref("");
const phone_number = ref("");
const location = ref("");

// Kulcs-érték párok meghatározása
const prepareBookingData = () => {
  return {
    machine_id: props.machine.id,
    last_name: last_name.value,
    first_name: first_name.value,
    email: email.value,
    phone_number: phone_number.value,
    location: location.value,
    price: totalPrice.value,
    start_date: startDate.value
      ? startDate.value.toISOString().split("T")[0]
      : null,
    end_date: endDate.value ? endDate.value.toISOString().split("T")[0] : null,
  };
};

/* Felugró ablak */
const isSent = ref(true);
const notSent = ref(false);
const isError = ref(false);

// Ablak bezárása
const cancelPopup = () => {
  isSent.value = false;
  notSent.value = false;
  isError.value = false;
};

/* Foglalás elküldése */
const submitBooking = async () => {
  const bookingData = prepareBookingData();
  try {
    // POST kérés elküldése
    const response = await axios.post(
      "http://localhost:3000/api/bookings",
      bookingData
    );
    // Sikeres elküldés esetén adatok visszaállítása kezdeti helyzetbe, felugró ablak megjelenítése
    if (response.status === 201) {
      isSent.value = true;
      last_name.value = "";
      first_name.value = "";
      email.value = "";
      phone_number.value = "";
      location.value = "";
      date.value = [new Date(), null];
    }
  } catch (error) {
    // Hibakezelés
    notSent.value = true;
    isError.value = true;
    console.error("Hiba a megrendelés létrehozásakor:", error);
  }
};

// Paid, azaz kifizetett (garantáltan foglalt) foglalások lekérdezése
// Ezzel visszakapunk egy tömböt az összes "Paid" státuszú foglalással
const paidBookings = ref([]);
const machineId = ref(props.machine.id);

async function fetchAndSetPaidBookings() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/paidBookingsMachine?machine_id=${machineId.value}`
    );
    paidBookings.value = response.data;
  } catch (error) {
    console.log("Hiba az adatok lekérdezése közben:", error);
  }
}

// Ha simán ${props.machine.id}-t kapna a GET request, hamarabb lenne elküldve, minthogy megkapja az ID-t, ezért undefined lenne a response
// Ennek kiküszöbölésére használunk watch-ot
watch(
  () => props.machine.id,
  (newMachineId, oldMachineId) => {
    if (newMachineId !== oldMachineId && newMachineId !== undefined) {
      machineId.value = newMachineId;
      fetchAndSetPaidBookings();
    }
  }
);

// Ha mégis elérhető lenne az oldal inicializálásakor a props.machine.id, akkor fusson le a GET request
onMounted(() => {
  if (machineId.value !== undefined) {
    fetchAndSetPaidBookings();
  }
  socket.on("bookingsUpdated", () => {
    fetchAndSetPaidBookings();
  });
});

// Azoknak a dátumoknak a letiltása, amik már garantáltan foglaltak ("Paid" státusz)
const disabledDates = computed(() => {
  const disabledDateRange = [];

  for (const booking of paidBookings.value) {
    const bookingStartDate = new Date(booking.start_date);
    const bookingEndDate = new Date(booking.end_date);
    for (
      let date = bookingStartDate;
      date <= bookingEndDate;
      date.setDate(date.getDate() + 1)
    ) {
      disabledDateRange.push(new Date(date));
    }
  }
  return disabledDateRange;
});
</script>

<style scoped>
.form-wrap {
  width: 100%;
  background-color: #e8e6e6;
  padding: 10px 0px 40px 0px;
  transition: background-color 0.5s, color 0.5s;
}

.booking-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.5s, border 0.5s;
}

.booking-form h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.user-info .input-group {
  margin: 10px 0;
}

.user-info label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.user-info input[type="text"],
.user-info input[type="email"],
.user-info input[type="tel"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.5s, color 0.5s, border 0.5s;
}

.total-price p {
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.price-note {
  padding-bottom: 10px;
  font-size: 16px;
  line-height: 1.1;
  color: red;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
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
  z-index: 5;
}

.popup {
  background-color: #dfdfdf;
  padding: 40px;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: border 0.3s;
}

.popup-result {
  font-size: 20px;
  margin-bottom: 4px;
}

.popup-message {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.popup-button {
  display: flex;
  justify-content: center;
}

.cancel-button {
  padding: 10px 20px;
  margin: 0 14px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border 0.3s;
}

.cancel-button:hover {
  background-color: lightgray;
}

/* Dark mode */
.form-wrap.dark-mode {
  background-color: #1a1a1a;
  color: #eeeeee;
}

.form-wrap.dark-mode .booking-form {
  background-color: #303030;
  border: 1px solid #ddd;
}

.form-wrap.dark-mode .user-info input {
  background-color: #212121;
  border: 1px solid #ffffff;
  color: white;
}

.form-wrap.dark-mode .submit-button {
  background-color: #0056b3;
}

.form-wrap.dark-mode .submit-button:hover {
  background-color: #007bff;
}

.dp__theme_dark {
  --dp-border-color: white;
}

.form-wrap.dark-mode .popup {
  background-color: #1a1a1a;
  border: 1px solid white;
}

.form-wrap.dark-mode .cancel-button {
  border-color: black;
}

.form-wrap.dark-mode .cancel-button {
  background-color: #b94a50;
  color: #1a1a1a;
}

.form-wrap.dark-mode .cancel-button:hover {
  background-color: #d55b61;
  color: #1a1a1a;
  border: 1px solid red;
}

/* Mobilnézet */
@media screen and (max-width: 496px) {
  .form-wrap {
    padding: 0px;
    padding: 10px 20px 40px 20px;
  }

  .popup {
    padding: 20px;
    margin: 20px;
  }

  .popup-result {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .popup-message {
    font-size: 18px;
    margin-bottom: 18px;
    font-weight: bold;
  }
}
</style>
