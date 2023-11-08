<template>
  <section>
    <div class="machines-intro">
      <MachinesIntro />
    </div>
    <!-- Szűrés gomb -->
    <div class="filter-toggle" @click="toggleFilterSection">
      <button>Szűrés...</button>
    </div>
    <!-- Emelőgép kártyák -->
    <div class="content">
      <div class="machines-container">
        <MachinesDisplay
          v-for="machine in filteredMachines"
          :key="machine.id"
          :machine="machine"
        />
      </div>
    </div>
    <!-- Szűrés ablak -->
    <div class="filter-section" :class="{ open: showFilterSection }">
      <div class="filter-content">
        <h3>Szűrők</h3>
        <div class="filter-input">
          <label class="filter-label" for="requiredHeightFilter"
            >Minimum magasság:</label
          >
          <input
            type="number"
            v-model="filters.requiredHeight"
            id="requiredHeightFilter"
          />
        </div>
        <div class="filter-input">
          <label class="filter-label" for="requiredWeightFilter"
            >Minimum teherbírás:</label
          >
          <input
            type="number"
            v-model="filters.requiredWeight"
            id="requiredWeightFilter"
          />
        </div>
        <div class="filter-input">
          <label class="filter-label" for="hasSoleFilter">Talp:</label>
          <input type="checkbox" v-model="filters.hasSole" id="hasSoleFilter" />
        </div>
        <div class="filter-input">
          <label class="filter-label" for="hasBasketFilter">Kosár:</label>
          <input
            type="checkbox"
            v-model="filters.hasBasket"
            id="hasBasketFilter"
          />
        </div>
        <div class="filter-input">
          <label class="filter-label" for="hasForkFilter">Villa:</label>
          <input type="checkbox" v-model="filters.hasFork" id="hasForkFilter" />
        </div>
        <div class="filter-input">
          <label class="filter-label" for="isRemoteFilter"
            >Távirányítható:</label
          >
          <input
            type="checkbox"
            v-model="filters.isRemote"
            id="isRemoteFilter"
          />
        </div>
        <div class="filter-button">
          <button @click="resetFilters">Szűrők törlése</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MachinesIntro from "@/components/MachinesComponents/MachinesIntro.vue";
import MachinesDisplay from "@/components/MachinesComponents/MachinesDisplay.vue";
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";

const machines = ref([]);

// Filter opciók
const filters = reactive({
  requiredHeight: null,
  requiredWeight: null,
  hasSole: false,
  hasBasket: false,
  hasFork: false,
  isRemote: false,
});

// Filter ablak megjelenítése
const showFilterSection = ref(false);

// Szűrők alkalmazása
const filteredMachines = computed(() => {
  return machines.value.filter((machine) => {
    if (
      filters.requiredHeight !== null &&
      machine.max_height < filters.requiredHeight
    ) {
      return false;
    }
    if (
      filters.requiredWeight !== null &&
      machine.max_weight < filters.requiredWeight
    ) {
      return false;
    }
    if (filters.hasSole && !machine.has_sole) {
      return false;
    }
    if (filters.hasBasket && !machine.has_basket) {
      return false;
    }
    if (filters.hasFork && !machine.has_fork) {
      return false;
    }
    if (filters.isRemote && !machine.is_remote) {
      return false;
    }
    // Ha mindnek megfelel, listázás
    return true;
  });
});

// Szűrők törlése és az összes nehézgép listázása
function resetFilters() {
  for (const key in filters) {
    filters[key] = null;
  }
}

// Szűrők megjelenítése toggle
function toggleFilterSection() {
  showFilterSection.value = !showFilterSection.value;
}

// Adatok fetchelése
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
</script>

<style scoped>
.content {
  min-height: 80vh;
  background-color: #e8e6e6;
}

.machines-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0px;
  padding: 140px 0px 40px 0px;
}

.filter-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 2;
}

.filter-section {
  width: 320px;
  height: 100%;
  position: fixed;
  left: -320px;
  top: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  transition: left 0.5s;
  z-index: 1;
}

.filter-section.open {
  left: 0;
  background-color: rgba(249, 249, 249, 0.9);
}

.filter-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
}

.filter-content {
  padding-top: 50px;
}

.filter-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-label {
  width: 160px;
}

.filter-input label {
  margin-right: 10px;
}

.filter-input input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-button {
  display: flex;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .machines-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .machines-container {
    padding-top: 100px;
  }
}
</style>
