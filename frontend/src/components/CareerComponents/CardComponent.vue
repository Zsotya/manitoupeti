<template>
  <div class="career-card">
    <div class="card-content">
      <div class="card-text-part">
        <div class="card-title">{{ job["jobname_" + $i18n.locale] }}</div>
        <div class="job-time-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
            />
          </svg>
        </div>
        <div class="job-time">{{ job["jobtime_" + $i18n.locale] }}</div>
        <div class="card-text-content">
          {{ job["jobdescription_" + $i18n.locale] }}
        </div>
      </div>
    </div>
    <button class="apply-button">{{ $t("careerApply") }}</button>
  </div>
</template>

<script setup>
const { job } = defineProps(["job"]);
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
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(155deg, #f3e0c8, #dbc3a4, #c5a57e);
  transition: 0.15s;
  border-radius: 10px;
}

.career-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
  transition: box-shadow 0.15s ease, transform 0.3s ease;
}

.card-title {
  font-size: 24px;
  margin-bottom: 4px;
  margin-top: 60px;
  background: linear-gradient(45deg, #222, #444);
  -webkit-background-clip: text;
  background-clip: text;
  color: #555;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.job-time-icon {
  display: inline-block;
  align-items: center;
  vertical-align: middle;
  margin-right: 6px;
}

.job-time {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 16px;
}

.card-text-content {
  font-size: 18px;
  width: 30ch;
  text-align: left;
  margin-bottom: 16px;
  word-wrap: break-word;
  text-align: justify;
}

.apply-button {
  position: relative;
  background: linear-gradient(135deg, #e5e5e5, #dcdcdc);
  color: #333;
  padding: 24px 80px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  bottom: 50px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.4s ease, transform 0.2s ease;
}

.apply-button:hover {
  background: linear-gradient(135deg, #ccc, #c7c6c6);
  transform: scale(1.05);
  transition: background 0.4s ease, transform 0.2s ease;
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
</style>
