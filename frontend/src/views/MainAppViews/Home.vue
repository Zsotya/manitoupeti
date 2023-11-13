<template>
  <div>
    <section><HomeLanding /></section>
    <section><HomeParagraphIntro /></section>
    <section>
      <HomeParagraph
        v-for="(paragraph, index) in paragraphs"
        :key="paragraph.id"
        :paragraph="paragraph"
        :order="calculateOrder(index)"
      />
    </section>
    <section><HomeWhoAreWe /></section>
    <section><HomeGallery /></section>
  </div>
</template>

<script setup>
import HomeLanding from "@/components/HomeComponents/HomeLanding.vue";
import HomeParagraphIntro from "@/components/HomeComponents/HomeParagraphIntro.vue";
import HomeParagraph from "@/components/HomeComponents/HomeParagraph.vue";
import HomeWhoAreWe from "@/components/HomeComponents/HomeWhoAreWe.vue";
import HomeGallery from "@/components/HomeComponents/HomeGallery.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

// Adatok fetchelése
const paragraphs = ref([]);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/paragraphs");
    paragraphs.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});

// Páratlan indexű esetén kép jobb oldalt, szöveg bal oldalt. Páratlan esetén fordítva (reverse-order)
const calculateOrder = (index) => {
  return index % 2 === 0 ? 1 : 2;
};
</script>

<style scoped></style>
