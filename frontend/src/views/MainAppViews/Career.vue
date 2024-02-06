<template>
  <section class="carrer-comp">
    <CareerIntro />
  </section>
  <section>
    <div class="career-cards-container" :class="{ 'dark-mode': darkMode }">
      <div class="career-cards">
        <CardComponent v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>

<script setup>
import CareerIntro from "@/components/CareerComponents/CareerIntro.vue";
import CardComponent from "@/components/CareerComponents/CardComponent.vue";
import axios from "axios";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

// Adatok fetchelése
const jobs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.career-cards-container {
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}

.career-cards {
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .career-cards-container {
    margin: 0;
  }
  .career-cards {
    padding: 30px 0 80px 0;
  }
}

/* Dark mode */
.career-cards-container.dark-mode {
  background-color: #1a1a1a;
}
</style>
