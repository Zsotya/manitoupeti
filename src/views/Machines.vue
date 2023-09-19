<template>
  <div>
    <MachinesIntro />
    <div class="machines-container">
      <MachinesDisplay
        v-for="machine in machines"
        :key="machine.id"
        :machine="machine"
      />
    </div>
  </div>
</template>

<script setup>
import MachinesIntro from "@/components/MachinesComponents/MachinesIntro.vue";
import MachinesDisplay from "@/components/MachinesComponents/MachinesDisplay.vue";

const machines = [
  {
    id: 1,
    name: "Bobcat",
    img: require("@/assets/41.jpg"),
    maxHeight: "50m",
    maxWeight: "5000kg",
    hasSole: true,
    soleCount: 4,
    hasBasket: true,
    hasFork: true,
    isRemote: true,
  },
  {
    id: 2,
    name: "Manitou",
    img: require("@/assets/41.jpg"),
    maxHeight: "30m",
    maxWeight: "4000kg",
    hasSole: true,
    soleCount: 2,
    hasBasket: false,
    hasFork: true,
    isRemote: false,
  },
  {
    id: 3,
    name: "Bobket",
    img: require("@/assets/41.jpg"),
    maxHeight: "42m",
    maxWeight: "6000kg",
    hasSole: false,
    soleCount: 0,
    hasBasket: false,
    hasFork: false,
    isRemote: true,
  },
  {
    id: 4,
    name: "Bobket2",
    img: require("@/assets/41.jpg"),
    maxHeight: "42m",
    maxWeight: "6000kg",
    hasSole: true,
    soleCount: 2,
    hasBasket: false,
    hasFork: false,
    isRemote: true,
  },
  {
    id: 5,
    name: "Bobket3",
    img: require("@/assets/41.jpg"),
    maxHeight: "42m",
    maxWeight: "6000kg",
    hasSole: false,
    soleCount: 0,
    hasBasket: false,
    hasFork: false,
    isRemote: true,
  },
];
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

@media screen and (max-width: 768px) {
  /* .machines-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */
}

@media screen and (max-width: 496px) {
  .machines-container {
    padding-top: 100px;
  }
}
</style>
