<template>
  <div class="page-container" :class="{ 'dark-mode': darkMode }">
    <section><OurWorksIntro /></section>
    <section class="films-wrap">
      <section class="our-works">
        <OurWorksFilms v-for="film in films" :key="film.id" :film="film" />
      </section>
    </section>
  </div>
</template>

<script setup>
import OurWorksFilms from "@/components/OurWorksComponents/OurWorksFilms.vue";
import OurWorksIntro from "@/components/OurWorksComponents/OurWorksIntro.vue";
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// Adatok fetchelése
const films = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/films");
    films.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.films-wrap {
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}
.our-works {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 20px;
}

@media screen and (max-width: 1024px) {
  .our-works {
    align-items: center;
  }
}

/* Dark mode */
.page-container.dark-mode .films-wrap {
  background-color: #1a1a1a;
}
</style>
