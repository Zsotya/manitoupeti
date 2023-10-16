<template>
  <section>
    <MachinesIntro />
    <div class="machines-container">
      <MachinesDisplay
        v-for="machine in machines"
        :key="machine.id"
        :machine="machine"
      />
    </div>
  </section>
</template>

<script setup>
import MachinesIntro from "@/components/MachinesComponents/MachinesIntro.vue";
import MachinesDisplay from "@/components/MachinesComponents/MachinesDisplay.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const machines = ref([]);

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/machines");
    machines.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});

// const machines = [
//   {
//     id: 1,
//     machine_name: "Bobcat",
//     max_height: "50m",
//     max_weight: "5000kg",
//     has_sole: true,
//     sole_count: 4,
//     has_basket: true,
//     has_fork: true,
//     is_remote: true,
//     price_per_day: 50000,
//     image_url: "a",
//   },
//   {
//     id: 2,
//     machine_name: "Manitou",
//     max_height: "30m",
//     max_weight: "4000kg",
//     has_sole: true,
//     sole_count: 2,
//     has_basket: false,
//     has_fork: true,
//     is_remote: false,
//     price_per_day: 80000,
//     image_url: "a",
//   },
// ];
</script>

<style scoped>
.machines-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0px;
  padding: 140px 0px 40px 0px;
  background-color: #e8e6e6;
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  /* .machines-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .machines-container {
    padding-top: 100px;
  }
}
</style>
