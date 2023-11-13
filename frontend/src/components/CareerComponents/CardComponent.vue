<template>
  <div class="career-card" :class="{ 'dark-mode': darkMode }">
    <div class="card-content">
      <div class="card-text-part">
        <div class="card-title">{{ job["jobname_" + $i18n.locale] }}</div>
        <div class="job-time-icon">
          <i class="fa-regular fa-clock"></i>
        </div>
        <div class="job-time">{{ job["jobtime_" + $i18n.locale] }}</div>
        <div class="card-text-content">
          {{ job["jobdescription_" + $i18n.locale] }}
        </div>
      </div>
    </div>
    <router-link :to="`/karrier/${job.id}`">
      <button class="apply-button">{{ $t("careerApply") }}</button></router-link
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Adatok meghatározása
const { job } = defineProps(["job"]);

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.career-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  width: 410px;
  height: 460px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #edcca3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: 0.15s, background-color 0.5s, color 0.5s, box-shadow 0.7s;
}

.career-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
  transition: box-shadow 0.15s, transform 0.3s;
}

.card-title {
  font-size: 24px;
  margin-bottom: 4px;
  margin-top: 60px;
  background-color: #333333;
  -webkit-background-clip: text;
  background-clip: text;
  color: #444;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.5s, color 0.5s, text-shadow 0.7s;
}

.job-time-icon {
  display: inline-block;
  align-items: center;
  vertical-align: middle;
  margin-right: 6px;
  color: #222;
}

.job-time {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 16px;
  color: #222;
}

.card-text-content {
  font-size: 18px;
  width: 30ch;
  text-align: left;
  margin-bottom: 16px;
  word-wrap: break-word;
  text-align: justify;
  color: #222;
}

.job-time-icon,
.job-time,
.card-text-content {
  transition: color 0.5s;
}

.apply-button {
  position: relative;
  background-color: #007bff;
  color: #fff;
  padding: 24px 80px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  bottom: 50px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s, transform 0.3s;
}

.apply-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .career-card {
    width: 69vw;
    height: 54vh;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .card-text-content {
    flex-wrap: wrap;
    width: 100%;
  }
  .apply-button {
    padding: 20px 20px;
  }
}

/* Dark mode */
.career-card.dark-mode {
  background-color: #364048;
  border: 1px solid #4d5d6d;
  box-shadow: 1px 2px 8px rgba(255, 255, 255, 0.4);
}

.career-card.dark-mode .card-title {
  background-color: #4d90fe;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.career-card.dark-mode .job-time-icon,
.career-card.dark-mode .job-time,
.career-card.dark-mode .card-text-content {
  color: #ccc;
}

.career-card.dark-mode .apply-button {
  background-color: #0056b3;
}

.career-card.dark-mode .apply-button:hover {
  background-color: #007bff;
}
</style>
