<template>
  <div class="career-card">
    <div class="card-content">
      <div class="card-text-part">
        <div class="card-title">{{ job.jobName }}</div>
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
  background-color: white;
  margin-bottom: 20px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 18px;
  margin-top: 80px;
}

.card-text-content {
  font-size: 16px;
  width: 30ch;
  text-align: left;
  margin-bottom: 16px;
  word-wrap: break-word;
}

.apply-button {
  position: relative;
  background-color: transparent;
  color: black;
  padding: 24px 74px;
  cursor: pointer;
  border: 1px solid red;
  bottom: 50px;
  transition: 0.8s ease;
}

.apply-button:hover {
  border: 1px solid black;
  transition: 0.8s ease;
}
</style>
