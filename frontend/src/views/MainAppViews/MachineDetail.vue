<template>
  <div class="machine-detail">
    <div class="machine-info">
      <div class="machine-image">
        <img :src="machine.image_url" alt="Machine Image" />
      </div>
      <div class="machine-properties">
        <h1 class="machine-name">{{ machine.machine_name }}</h1>
        <div class="property">
          <span class="label">{{ $t("machinesDetailMaxWorkingHeight") }}:</span>
          <span class="value">{{ machine.max_height }}m</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesDetailMaxLoadCapacity") }}</span>
          <span class="value">{{ machine.max_weight }}kg</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesSole") }}:</span>
          <span class="value">{{
            machine.has_sole ? $t("machinesCommonYes") : $t("machinesCommonNo")
          }}</span>
        </div>
        <div class="property" v-if="machine.has_sole">
          <span class="label">{{ $t("machinesSoleCount") }}:</span>
          <span class="value">{{ machine.sole_count }}</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesBasket") }}:</span>
          <span class="value">{{
            machine.has_basket
              ? $t("machinesCommonYes")
              : $t("machinesCommonNo")
          }}</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesFork") }}:</span>
          <span class="value">{{
            machine.has_fork ? $t("machinesCommonYes") : $t("machinesCommonNo")
          }}</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesRemote") }}:</span>
          <span class="value">{{
            machine.is_remote ? $t("machinesCommonYes") : $t("machinesCommonNo")
          }}</span>
        </div>
        <div class="property">
          <span class="label">{{ $t("machinesPricePerDay") }}:</span>
          <span class="value">{{ machine.price_per_day }}Ft</span>
        </div>
      </div>
    </div>
  </div>
  <FullCalendar />
  <BookingForm :machine="machine" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";
import FullCalendar from "@/components/MachineDetailComponents/FullCalendar.vue";
import BookingForm from "@/components/MachineDetailComponents/BookingForm.vue";

const route = useRoute();
const router = useRouter();
const machine = ref([]);

async function fetchData() {
  try {
    const machineId = route.params.id;
    const response = await axios.get(
      `http://localhost:3000/api/machines/${machineId}`
    );
    // Ha létezik nehézgép az URL-ben megadott ID-vel, 2xx státuszú response-t kapunk, ekkor machine értékének feltöltése
    if (response.status >= 200 && response.status < 300) {
      machine.value = response.data;
    }
    // Ha nem létezik nehézgép ilyen ID-vel, 404 oldalra navigálás
    else {
      router.replace("/404");
    }
  } catch (error) {
    // Ha Axios-tól kapunk 404-es státuszt, szintén 404 oldalra navigálás
    if (error.response && error.response.status === 404) {
      router.replace("/404");
    }
    // Egyéb hibakódok esetén
    else {
      console.error("Error fetching data:", error);
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.machine-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 30px;
  background-color: #e8e6e6;
}

.machine-info {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 80%;
}

.machine-name {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  transition: color 0.3s;
  width: 100%;
  text-align: center;
}

.machine-name:hover {
  color: #ff6633;
}

.machine-image {
  width: 50%;
  max-width: 500px;
  height: auto;
  overflow: hidden;
  border: 3px solid #e6e6e6;
  border-radius: 10px;
  margin-right: 26px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.machine-image:hover {
  transform: scale(1.05);
}

.machine-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s;
}

.machine-properties {
  width: 70%;
}

.property {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.6;
  transition: color 0.3s;
}

.label {
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
}

.value {
  color: #333;
  transition: color 0.3s;
}

.property:hover .label,
.property:hover .value {
  color: #ff6633;
}

@media screen and (max-width: 768px) {
  .machine-info {
    flex-direction: column;
    text-align: center;
  }

  .machine-image {
    width: 100%;
    margin-right: 0;
  }

  .property {
    flex-direction: column;
    text-align: center;
  }
}
</style>
