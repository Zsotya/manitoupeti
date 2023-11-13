<template>
  <div class="career-component" :class="{ 'dark-mode': darkMode }">
    <div class="text-part">
      <div class="small-content">{{ $t("careerSmallContent") }}</div>
      <div class="big-content">{{ $t("careerBigContent") }}</div>
    </div>
    <div class="career-cards-container">
      <div class="career-cards">
        <CardComponent v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from "./CardComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";

// Adatok meghatározása
const { jobs } = defineProps(["jobs"]);

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.career-component {
  background-color: #e8e6e6;
  display: flex;
  flex-direction: column;
  padding-left: 90px;
  transition: background-color 0.5s, color 0.5s;
}

.text-part {
  display: flex;
  flex-direction: column;
  padding-top: 240px;
  width: 100%;
}

.small-content {
  font-size: 24px;
  margin-bottom: 2px;
  margin-left: 4px;
}

.big-content {
  font-size: 46px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  max-width: 100%;
}

.career-cards-container {
  margin-left: -60px;
}

.career-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px 40px 80px 30px;
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .career-cards-container {
    margin: 0;
  }
  .career-component {
    padding: 0;
  }
  .text-part {
    align-items: center;
  }
  .career-cards {
    padding: 30px 0 80px 0;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .small-content {
    font-size: 22px;
    text-align: center;
  }

  .big-content {
    font-size: 38px;
    text-align: center;
  }
}

/* Dark mode */
.career-component.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
