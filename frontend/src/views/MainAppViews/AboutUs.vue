<template>
  <section>
    <AboutUsIntro />
    <AboutUsParagraph
      v-for="(item, index) in aboutus"
      :key="aboutus.id"
      :item="item"
      :order="calculateOrder(index)"
    />
  </section>
</template>

<script setup>
import AboutUsIntro from "@/components/AboutUsComponents/AboutUsIntro.vue";
import AboutUsParagraph from "@/components/AboutUsComponents/AboutUsParagraph.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

// Adatok fetchelése
const aboutus = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/aboutus");
    aboutus.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Páratlan indexű esetén kép jobb oldalt, szöveg bal oldalt. Páratlan esetén fordítva (reverse-order)
const calculateOrder = (index) => {
  return index % 2 === 0 ? 1 : 0;
};
</script>
