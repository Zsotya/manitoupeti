<template>
  <div class="form-wrap">
    <div class="booking-form">
      <h1>Emelőgép foglalás</h1>

      <!-- Dátum range kiválasztása (vue datepicker) -->
      <form @submit.prevent="submitBooking">
        <DatePicker
          v-model="date"
          range
          :format="customFormat"
          no-disabled-range
          :disabled-dates="disabledDates"
          :min-date="new Date()"
          :enable-time-picker="false"
          required
        />

        <!-- Megrendelő információk -->
        <div class="user-info">
          <div class="input-group">
            <label for="first-name">Vezetéknév:</label>
            <input type="text" id="first-name" v-model="first_name" required />
          </div>
          <div class="input-group">
            <label for="last-name">Keresztnév:</label>
            <input type="text" id="last-name" v-model="last_name" required />
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="phone">Telefonszám:</label>
            <input type="tel" id="phone" v-model="phone_number" required />
          </div>
          <div>
            <label for="location">Helyszín:</label>
            <input type="text" id="location" v-model="location" required />
          </div>
        </div>

        <!-- Végösszeg kiszámolása -->
        <div class="total-price">
          <p>Gép bérleti díj: {{ totalPrice }} Ft</p>
        </div>
        <div class="price-note" v-if="date && date[0] && date[1]">
          <p>
            Tájékoztatjuk kedves megrendelőinket, hogy a bérleti díj nem
            tartalmazza a logisztikai díjakat, valamint egyéb adókat.
          </p>
        </div>
        <button type="submit">Foglalás elküldése</button>
      </form>
    </div>
  </div>
  <!-- <button @click="testButton">testbutton</button> -->
</template>

<script setup>
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

const props = defineProps(["machine"]);
const date = ref([new Date(), null]);

// Date picker format

const startDate = ref();
const endDate = ref();
const customFormat = (date) => {
  const formatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  startDate.value = date[0];
  endDate.value = date[1];

  if (startDate.value && endDate.value) {
    const formattedStartDate = startDate.value.toLocaleDateString(
      "hu-HU",
      formatOptions
    );
    const formattedEndDate = endDate.value.toLocaleDateString(
      "hu-HU",
      formatOptions
    );
    return `A választott időintervallum: ${formattedStartDate} - ${formattedEndDate}`;
  }

  return "Válasszon időintervallumot...";
};

// Total price calculation

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

// Teszt gomb unit tesztekhez

// const testButton = () => {
//   const teszt = new Date(paidBookings.value[0].start_date);
//   const teszt2 = new Date(paidBookings.value[0].end_date);
//   console.log(teszt);
//   console.log(teszt2);
//   console.log(teszt);
//   console.log(teszt2);
//   console.log(disabledDates);
// };

// POST request preparation

// Form elemek

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const phone_number = ref("");
const location = ref("");

// Kulcs-érték párok meghatározása

const prepareBookingData = () => {
  return {
    machine_id: props.machine.id,
    first_name: first_name.value,
    last_name: last_name.value,
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

// Foglalás elküldése

const submitBooking = async () => {
  const bookingData = prepareBookingData();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/bookings",
      bookingData
    );
    if (response.status === 201) {
      console.log("Booking added successfully");
    }
  } catch (error) {
    console.error("Error while adding a booking:", error);
  }
};

// Paid, azaz kifizetett (garantáltan foglalt) foglalások lekérdezése
// Ezzel visszakapunk egy tömböt az összes "Paid" státuszú foglalással

const paidBookings = ref([]);
const machineId = ref(props.machine.id);

async function fetchAndSetPaidBookings() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/paidBookings?machine_id=${machineId.value}`
    );
    paidBookings.value = response.data;
  } catch (error) {
    console.log("Error fetching/setting data:", error);
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
}
.booking-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
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

button {
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

button:hover {
  background-color: #0056b3;
}
</style>