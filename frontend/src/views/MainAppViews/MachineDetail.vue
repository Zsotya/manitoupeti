<template>
  <section class="machines-detail-list-container">
    <MachinesDetailList :machine="machine" />
  </section>
  <!-- <section class="full-calendar-container"><FullCalendar /></section> -->
  <section class="machines-gallery-container">
    <MachinesGalleryCarousel />
  </section>
  <section class="booking-form-container">
    <BookingForm :machine="machine" />
  </section>
</template>

<script setup>
import MachinesDetailList from "@/components/MachineDetailComponents/MachinesDetailList.vue";
import FullCalendar from "@/components/MachineDetailComponents/FullCalendar.vue";
import MachinesGalleryCarousel from "@/components/MachineDetailComponents/MachinesGalleryCarousel.vue";
import BookingForm from "@/components/MachineDetailComponents/BookingForm.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";

// Adatok fetchelése
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
      console.error("Hiba az adatok lekérdezése közben:", error);
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
