<template>
  <div>
    <Logo />
    <NavBar />
    <MachinesIntro />
    <div class="machines-container">
      <MachinesDisplay
        v-for="machine in machines"
        :key="machines.id"
        :machine="machine"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "@/components/RootComponents/NavBar.vue";
import Logo from "@/components/RootComponents/Logo.vue";
import MachinesIntro from "@/components/MachinesComponents/MachinesIntro.vue";
import MachinesDisplay from "@/components/MachinesComponents/MachinesDisplay.vue";
import Footer from "@/components/RootComponents/Footer.vue";

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
  justify-content: center;
  gap: 40px;
  margin: 20px;
}

@media (max-width: 768px) {
  .machines-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
