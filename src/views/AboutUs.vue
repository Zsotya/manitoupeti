<template>
  <section>
    <AboutUsIntro />
    <AboutUsParagraph
      v-for="paragraph in paragraphs"
      :key="paragraphs.id"
      :paragraph="paragraph"
    />
  </section>
</template>

<script setup>
import AboutUsIntro from "@/components/AboutUsComponents/AboutUsIntro.vue";
import AboutUsParagraph from "@/components/AboutUsComponents/AboutUsParagraph.vue";

const paragraphs = [
  {
    id: 1,
    title_hu: "Hőszigetelési múltunk",
    title_en: "Our thermal insulation past",
    content_hu:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    content_en:
      "LoremEN, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 2,
    title_hu: "Filmes kezdetek",
    title_en: "Beginnings in films",
    content_hu:
      "Korem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    content_en:
      "KoremEN, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 3,
    title_hu: "A jelen...",
    title_en: "The present...",
    content_hu:
      "Forem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    content_en:
      "ForemEN, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 4,
    title_hu: "Kilátásaink a jövőről",
    title_en: "Our prospects on the future",
    content_hu:
      "Sorem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    content_en:
      "SoremEN, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 5,
    title_hu: "Tardi Péter - A ManitouPeti arca",
    title_en: "Peter Tardi - The face of ManitouPeti",
    content_hu:
      "Porem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    content_en:
      "PoremEN, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
];
</script>
