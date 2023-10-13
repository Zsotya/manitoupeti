<template>
  <section><OurWorksIntro /></section>
  <section class="films-wrap">
    <section class="our-works">
      <OurWorksFilms v-for="film in films" :key="film.id" :film="film" />
    </section>
  </section>
</template>

<script setup>
import OurWorksFilms from "@/components/OurWorksComponents/OurWorksFilms.vue";
import OurWorksIntro from "@/components/OurWorksComponents/OurWorksIntro.vue";

import axios from "axios";
import { ref, onMounted } from "vue";

const films = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/films");
    films.value = response.data;
    console.log(films.value[0].id);
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
</style>
