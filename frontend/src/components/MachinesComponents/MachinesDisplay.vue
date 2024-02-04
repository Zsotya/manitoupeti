<template>
  <div class="machines-display" :class="{ 'dark-mode': darkMode }">
    <div class="machines-item">
      <div class="image-container">
        <img
          :src="'http://localhost:3000' + machine.image_url"
          alt="Machine Image"
        />
      </div>
      <div class="machine-details">
        <div class="machine-name">{{ machine.machine_name }}</div>
        <div class="machine-description">
          <div class="feature">
            <span class="label">{{ $t("machinesMaxWorkingHeight") }}:</span>
            <span class="value">{{ machine.max_height }}m</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesMaxLoadCapacity") }}:</span>
            <span class="value">{{ machine.max_weight }}kg</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesHeight") }}:</span>
            <span class="value">{{ machine.height }}mm</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesWidth") }}:</span>
            <span class="value">{{ machine.width }}mm</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesLength") }}:</span>
            <span class="value">{{ machine.length }}mm</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesWeight") }}:</span>
            <span class="value">{{ machine.weight }}kg</span>
          </div>
          <div class="feature" v-if="machine.has_rotohead">
            <span class="label"><i class="fas fa-check"></i> Rotohead</span>
          </div>
          <div class="feature" v-if="machine.has_fork">
            <span class="label"
              ><i class="fas fa-check"></i> {{ $t("machinesFork") }}</span
            >
          </div>
          <div class="feature" v-if="machine.has_forkextension">
            <span class="label"
              ><i class="fas fa-check"></i>
              {{ $t("machinesForkExtension") }}</span
            >
          </div>
          <div class="feature" v-if="machine.has_basket">
            <span class="label"
              ><i class="fas fa-check"></i> {{ $t("machinesBasket") }}</span
            >
          </div>
          <div class="feature" v-if="machine.has_winch">
            <span class="label"
              ><i class="fas fa-check"></i> {{ $t("machinesWinch") }}</span
            >
          </div>
        </div>
        <div class="button-container">
          <router-link :to="`/berelheto-gepeink/${machine.id}`">
            <button>{{ $t("machinesData") }}</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// Adatok importálása
const { machine } = defineProps(["machine"]);
</script>

<style scoped>
.machines-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  border: 1px solid #000000;
  padding: 20px;
  margin: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.5s, border 0.5s;
}

.machines-display:hover {
  transform: scale(1.05);
}

.machines-item {
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10px;
  width: 400px;
  height: 800px;
}

.image-container {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  max-height: 400px;
}

.machine-details {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.machine-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.5s;
}

.machine-description {
  margin-top: 10px;
}

.feature {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.label {
  font-weight: bold;
  color: #555;
  transition: color 0.5s;
}

.value {
  color: #333;
  transition: color 0.5s;
}

.button-container {
  position: absolute;
  bottom: 20px;
  text-align: center;
  align-self: center;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Tablet nézet */
/* @media screen and (max-width: 768px) {
} */

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .machines-display {
    margin: 20px 0px;
  }

  .machines-item {
    max-width: 240px;
    height: 740px;
  }

  .image-container {
    height: auto;
    height: 350px;
  }

  .image-container img {
    max-height: 350px;
  }
}

/* Dark mode */
.machines-display.dark-mode {
  background-color: #2a2a2a;
  border: 1px solid white;
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.2);
}

.machines-display.dark-mode .machine-name {
  color: #ffffff;
}

.machines-display.dark-mode .label,
.machines-display.dark-mode .value {
  color: #c1c1c1;
}

.machines-display.dark-mode button {
  background-color: #0056b3;
}

.machines-display.dark-mode button:hover {
  background-color: #007bff;
}
</style>
