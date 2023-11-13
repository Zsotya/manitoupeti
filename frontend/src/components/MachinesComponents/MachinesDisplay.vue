<template>
  <div class="machines-display" :class="{ 'dark-mode': darkMode }">
    <div class="machines-item">
      <div class="image-container">
        <img :src="machine.image_url" alt="Machine Image" />
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
            <span class="label">{{ $t("machinesSole") }}:</span>
            <span class="value">{{
              machine.has_sole
                ? $t("machinesCommonYes")
                : $t("machinesCommonNo")
            }}</span>
          </div>
          <div class="feature" v-if="machine.has_sole">
            <span class="label">{{ $t("machinesSoleCount") }}:</span>
            <span class="value">{{ machine.sole_count }}</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesBasket") }}:</span>
            <span class="value">{{
              machine.has_basket
                ? $t("machinesCommonYes")
                : $t("machinesCommonNo")
            }}</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesFork") }}:</span>
            <span class="value">{{
              machine.has_fork
                ? $t("machinesCommonYes")
                : $t("machinesCommonNo")
            }}</span>
          </div>
          <div class="feature">
            <span class="label">{{ $t("machinesRemote") }}:</span>
            <span class="value">{{
              machine.is_remote
                ? $t("machinesCommonYes")
                : $t("machinesCommonNo")
            }}</span>
          </div>
        </div>
        <div class="button-container">
          <router-link :to="`/berelheto-gepeink/${machine.id}`">
            <button>{{ $t("machinesQuotation") }}</button>
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
  margin: 20px 0;
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
  flex-direction: column;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 320px;
  height: auto;
}

.image-container {
  width: 100%;
}

.image-container img {
  max-width: 100%;
  height: auto;
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
  margin-top: 20px;
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
@media screen and (max-width: 768px) {
  .machines-display {
    max-width: 50%;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .machines-display {
    max-width: 100%;
  }

  .machines-item {
    max-width: 240px;
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
