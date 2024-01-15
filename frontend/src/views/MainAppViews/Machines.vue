<template>
  <section>
    <div class="page-container" :class="{ 'dark-mode': darkMode }">
      <div class="machines-intro">
        <MachinesIntro />
      </div>
      <!-- Szűrés gomb -->
      <div class="filter-toggle" @click="toggleFilterSection">
        <button>{{ $t("machinesFiltering") }}</button>
      </div>
      <!-- Emelőgép kártyák -->
      <div class="content">
        <Transition name="initialFade" appear v-if="show">
          <div class="machines-container">
            <TransitionGroup name="fade">
              <MachinesDisplay
                v-for="(machine, index) in filteredMachines"
                :key="machine.id"
                :machine="machine"
                :index="index"
            /></TransitionGroup></div
        ></Transition>
      </div>
      <!-- Szűrés ablak -->
      <div class="filter-section" :class="{ open: showFilterSection }">
        <div class="escape">
          <button @click="toggleFilterSection()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="filter-content">
          <h3>{{ $t("machinesFilterOptions") }}</h3>
          <div class="filter-input">
            <label class="filter-label" for="requiredHeightFilter"
              >{{ $t("machinesFilterMinHeight") }}:</label
            >
            <input
              type="number"
              v-model="filters.requiredHeight"
              id="requiredHeightFilter"
            />
          </div>
          <div class="filter-input">
            <label class="filter-label" for="requiredWeightFilter"
              >{{ $t("machinesFilterMinWeight") }}:</label
            >
            <input
              type="number"
              v-model="filters.requiredWeight"
              id="requiredWeightFilter"
            />
          </div>
          <div class="filter-input">
            <label class="filter-label" for="hasBasketFilter"
              >{{ $t("machinesBasket") }}:</label
            >
            <input
              type="checkbox"
              v-model="filters.hasBasket"
              id="hasBasketFilter"
            />
          </div>
          <div class="filter-input">
            <label class="filter-label" for="hasForkFilter"
              >{{ $t("machinesFork") }}:</label
            >
            <input
              type="checkbox"
              v-model="filters.hasFork"
              id="hasForkFilter"
            />
          </div>
          <div class="filter-input">
            <label class="filter-label" for="hasRotoheadFilter"
              >Rotohead:</label
            >
            <input
              type="checkbox"
              v-model="filters.hasRotohead"
              id="hasRotoheadFilter"
            />
          </div>
          <div class="filter-input">
            <label class="filter-label" for="hasWinchFilter"
              >{{ $t("machinesWinch") }}:</label
            >
            <input
              type="checkbox"
              v-model="filters.hasWinch"
              id="hasWinchFilter"
            />
          </div>
          <div class="filter-button">
            <button @click="resetFilters">
              {{ $t("machinesFiltersRemove") }}
            </button>
          </div>
          <div class="cancel-button">
            <button @click="toggleFilterSection()">
              {{ $t("machinesClose") }}
            </button>
          </div>
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
import { useStore } from "vuex";

// Adatok fetchelése, inicializálás
const machines = ref([]);
const show = ref(false);

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/machines");
    machines.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
}

onMounted(() => {
  fetchData();
  setInterval(() => {
    show.value = true;
  }, 500);
});

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// Filter ablak megjelenítő
const showFilterSection = ref(false);

// Szűrők megjelenítése toggle
function toggleFilterSection() {
  showFilterSection.value = !showFilterSection.value;
}

// Filter opciók
const filters = reactive({
  requiredHeight: null,
  requiredWeight: null,
  hasBasket: false,
  hasFork: false,
  hasRotohead: false,
  hasWinch: false,
});

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
    if (filters.hasBasket && !machine.has_basket) {
      return false;
    }
    if (filters.hasFork && !machine.has_fork) {
      return false;
    }
    if (filters.hasRotohead && !machine.has_rotohead) {
      return false;
    }
    if (filters.hasWinch && !machine.has_winch) {
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
</script>

<style scoped>
.content {
  min-height: 80vh;
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}

.machines-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0px;
  padding: 40px 0px 60px 0px;
  margin: 0px 50px 0px 50px;
}

.filter-toggle {
  position: absolute;
  top: 100px;
  left: 116px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1;
}

.filter-section {
  width: 320px;
  height: 100%;
  position: fixed;
  left: -320px;
  top: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  transition: 0.5s;
  z-index: 2;
}

.filter-section.open {
  left: 0;
  background-color: rgba(245, 245, 245, 1);
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
  width: 220px;
}

.filter-input label {
  margin-right: 10px;
}

.filter-input input {
  width: 38%;
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
  padding: 16px 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.cancel-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.escape {
  position: absolute;
  top: 4px;
  right: 4px;
}

.escape button {
  padding: 6px 8px;
}

/* Animációk */
.initialFade-enter-active {
  transition: all 2s;
}

.initialFade-enter-from {
  opacity: 0;
}

.initialFade-enter-to {
  opacity: 1;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .filter-toggle {
    top: 80px;
    left: 10px;
  }

  .filter-content {
    padding-top: 100px;
  }

  .escape {
    top: 0px;
    padding-top: 80px;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .machines-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }

  .filter-toggle {
    display: flex;
    width: 100%;
    justify-content: center;
    left: 0px;
  }

  .filter-content {
    padding-top: 50px;
  }

  .escape {
    top: 4px;
    padding-top: 0px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .machines-container {
    margin-left: 10px;
    margin-right: 10px;
  }

  .filter-section {
    width: 240px;
    left: -240px;
  }
}

/* Dark mode */
.page-container.dark-mode .content {
  background-color: #1a1a1a;
}

.page-container.dark-mode button {
  background-color: #0056b3;
}

.page-container.dark-mode button:hover {
  background-color: #007bff;
}

.page-container.dark-mode .filter-section.open {
  background-color: rgba(190, 190, 190, 1);
}
</style>
