<template>
  <div class="career-card" :class="{ 'dark-mode': darkMode }">
    <div class="card-content">
      <div class="card-text-part">
        <div class="header-part">
          <div class="card-title">{{ job["jobname_" + $i18n.locale] }}</div>
          <div class="job-time-icon">
            <i class="fa-regular fa-clock"></i>
          </div>
          <div class="job-time">{{ job["jobtime_" + $i18n.locale] }}</div>
        </div>
        <div class="card-text-container">
          <div class="card-text-content">
            {{ job["jobdescription_" + $i18n.locale] }}
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <router-link :to="`/karrier/${job.id}`">
        <button class="apply-button">{{ $t("careerApply") }}</button>
      </router-link>
    </div>
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
  justify-content: space-between;
  border: 1px solid transparent;
  width: 80vw;
  height: auto;
  margin-bottom: 40px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: 0.15s, background-color 0.5s, color 0.5s, box-shadow 0.7s;
}

.career-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
  transition: box-shadow 0.15s, transform 0.3s;
}

.header-part {
  margin: 40px 0px 20px 40px;
}

.card-title {
  font-size: 32px;
  background-color: #333333;
  -webkit-background-clip: text;
  background-clip: text;
  color: #444;
  transition: background-color 0.5s, color 0.5s, text-shadow 0.7s;
  line-height: 1.4;
}

.job-time-icon {
  display: inline-block;
  align-items: center;
  vertical-align: middle;
  margin-right: 6px;
  color: #000000;
}

.job-time {
  display: inline-block;
  font-size: 18px;
  color: #000000;
  line-height: 1.4;
}

.card-text-part {
  max-width: 100%;
}

.card-text-content {
  font-size: 24px;
  max-width: 90%;
  margin-left: 40px;
  margin-right: 40px;
  text-align: justify;
  color: #000000;
  line-height: 1.3;
}

.job-time-icon,
.job-time,
.card-text-content {
  transition: color 0.5s;
}

.button-container {
  margin: 30px 0px 40px 40px;
}

.apply-button {
  background-color: #007bff;
  color: #fff;
  padding: 18px 64px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s, transform 0.3s;
}

.apply-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .header-part {
    text-align: center;
    margin: 40px 0px;
  }

  .button-container {
    text-align: center;
    margin: 30px 0px 40px;
  }

  .apply-button {
    padding: 18px 40px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .card-title {
    font-size: 24px;
  }

  .job-time {
    font-size: 16px;
  }

  .career-card {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .card-text-content {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

/* Dark mode */
.career-card.dark-mode {
  background-color: #252525;
  border: 1px solid #969696;
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
  color: #dddddd;
}

.career-card.dark-mode .apply-button {
  background-color: #0056b3;
}

.career-card.dark-mode .apply-button:hover {
  background-color: #007bff;
}
</style>
