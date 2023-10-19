<template>
  <div class="form-wrap">
    <div class="booking-form">
      <h1>Emelőgép foglalás</h1>

      <!-- Dátum range kiválasztása (vue datepicker) -->
      <DatePicker
        v-model="date"
        range
        :format="customFormat"
        no-disabled-range
        :disabled-dates="disabledDates"
      />

      <!-- Megrendelő információk -->
      <div class="user-info">
        <div class="input-group">
          <label for="first-name">Vezetéknév:</label>
          <input type="text" id="first-name" v-model="firstName" />
        </div>
        <div class="input-group">
          <label for="last-name">Keresztnév:</label>
          <input type="text" id="last-name" v-model="lastName" />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input-group">
          <label for="phone">Telefonszám:</label>
          <input type="tel" id="phone" v-model="phoneNumber" />
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
      <button @click="submitBooking">Foglalás elküldése</button>
    </div>
  </div>
</template>

<script setup>
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, defineProps } from "vue";

const props = defineProps(["machine"]);
const date = ref([new Date(), null]);

const customFormat = (date) => {
  const formatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const startDate = date[0];
  const endDate = date[1];

  if (startDate && endDate) {
    const formattedStartDate = startDate.toLocaleDateString(
      "hu-HU",
      formatOptions
    );
    const formattedEndDate = endDate.toLocaleDateString("hu-HU", formatOptions);
    return `A választott időintervallum: ${formattedStartDate} - ${formattedEndDate}`;
  }

  return "Válasszon időintervallumot...";
};

const disabledDates = computed(() => {
  const disabledStartDate = new Date("2023-11-15");
  const disabledEndDate = new Date("2023-11-18");
  const disabledDateRange = [];
  for (
    let date = new Date(disabledStartDate);
    date <= disabledEndDate;
    date.setDate(date.getDate() + 1)
  ) {
    disabledDateRange.push(new Date(date));
  }
  return disabledDateRange;
});

const totalPrice = computed(() => {
  const startPrice = date.value ? date.value[0] : null;
  const endPrice = date.value ? date.value[1] : null;
  console.log(startPrice);
  console.log(endPrice);
  if (startPrice && endPrice) {
    const daysDifference = Math.ceil(
      (endPrice - startPrice + 1) / (1000 * 60 * 60 * 24)
    );
    return daysDifference * props.machine.price_per_day;
  }
  return 0;
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
