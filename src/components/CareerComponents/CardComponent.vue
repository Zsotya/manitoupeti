<template>
  <div class="career-card">
    <div class="card-content">
      <div class="card-text-part">
        <div class="card-title">{{ job.jobName }}</div>

        <div class="job-time">{{ job.jobTime }}</div>
        <div class="card-text-content">
          {{ job.jobDescription }}
        </div>
      </div>
    </div>
    <button class="apply-button">Jelentkezz most!</button>
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
  background: linear-gradient(155deg, #f0f0f0, #ccc, #e6e6e6);
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
  color: transparent;
}

.job-time {
  margin-bottom: 24px;
  font-size: 14px;
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
  background-color: rgba(242, 243, 235, 0.513);
  color: black;
  padding: 24px 80px;
  cursor: pointer;
  border: 1px solid red;
  bottom: 50px;
  transition: 0.4s;
  border-radius: 5px;
  font-weight: 600;
}

.apply-button:hover {
  border: 1px solid rgb(53, 53, 53);
  transition: 0.4s;
  background-color: rgb(236, 171, 171);
}
</style>
