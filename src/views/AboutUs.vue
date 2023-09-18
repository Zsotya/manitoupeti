<template>
  <div>
    <AboutUsIntro />
    <AboutUsParagraph
      v-for="paragraph in paragraphs"
      :key="paragraphs.id"
      :paragraph="paragraph"
    />
  </div>
</template>

<script setup>
import AboutUsIntro from "@/components/AboutUsComponents/AboutUsIntro.vue";
import AboutUsParagraph from "@/components/AboutUsComponents/AboutUsParagraph.vue";

const paragraphs = [
  {
    id: 1,
    title: "Hőszigetelési múltunk",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 2,
    title: "Filmes kezdetek",
    content:
      "Korem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 3,
    title: "A jelen...",
    content:
      "Forem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 4,
    title: "Kilátásaink a jövőről",
    content:
      "Sorem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
  {
    id: 5,
    title: "Tardi Péter - A ManitouPeti arca",
    content:
      "Porem, ipsum dolor sit amet consectetur adipisicing elit. Illo aut totam sapiente labore soluta modi est quisquam ipsam ad earum. Quaerat voluptate maxime unde sed, ipsa animi sunt repellendus nulla?",
    imageSrc: require("@/assets/41.jpg"),
  },
];
</script>
